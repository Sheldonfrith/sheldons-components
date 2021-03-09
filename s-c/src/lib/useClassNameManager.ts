import React, {Dispatch, useEffect, useState}  from "react";
import {BaseStylesProp, ReusableComponentBase, StyleDefaults, StyleOverride, TwClasses} from './typeHelpers';
import _ from 'lodash';
import { traverseObject } from "./functionHelpers";
import { twCascade } from "@mariusmarais/tailwind-cascade";


export default function useClassNameManager (stylesProp?: BaseStylesProp , defaults?: StyleDefaults){
    const [calculatedStyles, setCalculatedStyles] = useState<BaseStylesProp>();//! do not use setCalculatedStyles outside of the manager class
    const [manager, setManager] = useState(new ClassNamesManager(stylesProp, defaults, setCalculatedStyles));
    return manager;
}

class ClassNamesManager {
    private calculatedStyles: BaseStylesProp;
    private setCalculatedStyles;
    private initPropStyles;
    private initDefaultStyles;

    public constructor(initialStylesProp:BaseStylesProp = {none:{partial:true}}, initialDefaults: StyleDefaults = {none: ['']}, setStateFunc: Dispatch<React.SetStateAction<BaseStylesProp|undefined>>){
        this.initPropStyles = initialStylesProp;
        this.initDefaultStyles = initialDefaults;
        this.setCalculatedStyles = setStateFunc;
        const initCalculator = new StylePropsCalculator(this.initPropStyles, initialDefaults);
        this.calculatedStyles = initCalculator.get();
        console.log('finished setting up classNamesManager with calc: ',this.calculatedStyles, initialStylesProp, initialDefaults);
    }
    public getClassName(path: string):string{
        const targetObject: object = _.get(this.calculatedStyles,path);
        if (!targetObject) return '';
        const isStyleOverrideObj = (Object.keys(targetObject).includes('partial'));
        if (!isStyleOverrideObj) throw new Error('invalid object given to getClassName in ClassNamesManager');
        const nameCalculator = new ClassNameCalculator(targetObject as StyleOverride);
        return nameCalculator.getString();
    }
    public getObj(path: string):any{
        console.log('geting obj, ',path, 'from ', this.calculatedStyles);
        const target = _.get(this.calculatedStyles, path);
        
        if(!target)return undefined;
        const isStyleOverrideObj = (Object.keys(target).includes('partial'));
        if (isStyleOverrideObj) throw new Error('cannot use "getObj" method to get the styles for node(html element), only use this method for getting styles prop for React component');
        return target;
    }
    public partial(path: string, value: boolean):void{
        _.set(this.calculatedStyles,`${path}.partial`,value)
        this.updateState();
    }
    public remove(path: string, regExToRemove: RegExp[]):void{
        _.update(this.calculatedStyles, `${path}.tailwindRemoveClasses`, function(classList: RegExp[]){
            if (!classList) return [...regExToRemove];
            return[...classList, ...regExToRemove];
        });
        this.updateState();
    }
    public add(path: string, classesToAdd: TwClasses):void{
        _.update(this.calculatedStyles, `${path}.tailwind`, function(classList: TwClasses){
            console.log('updating ',path,' with ', classList, classesToAdd);
            if (!classList) return [...classesToAdd];
            return[...classList, ...classesToAdd];
        });
        this.updateState();
    }
    private updateState(){
        this.setCalculatedStyles({...this.calculatedStyles})
    }
}



class StylePropsCalculator {
    private calculatedStyles;
    private initPropStyles;
    private initDefaultStyles;
    public constructor(initPropStyles: BaseStylesProp, initDefaultStyles: StyleDefaults){
        this.initPropStyles = initPropStyles;
        this.initDefaultStyles = initDefaultStyles;
        this.calculatedStyles = this.calculateStyles();
    }
    public get(){
        return this.calculatedStyles;
    }
    private calculateStyles(): BaseStylesProp{
        console.log('beginning to calc styles with', this.initDefaultStyles, this.initPropStyles)
        const defaultsObj = this.getObjectFromDefaults();
        console.log('got this default obj', defaultsObj);
        const combiner = new StyleOverrideCombiner();
        return combiner.combineStyles(defaultsObj, this.initPropStyles);
    }
    
    private getObjectFromDefaults(): BaseStylesProp{
        console.log('getting default object with ',this.initDefaultStyles);
        const defaultsMapped = {};
        traverseObject(this.initDefaultStyles, (key:string|number,value:any, path:string[],parent: object)=>{
            // console.log('tranversing defaults', key, value, path);
            const isStringArray= (Array.isArray(value) && value.length && typeof value[0] === 'string');
            const isTwClasses = (isStringArray);
            if (!isTwClasses) return;
            console.log('tranversng for default create, IS TwClasses object', value, key, path);
            const newValue = this.convertTwClassesToStyleOverride(value);
            _.set(defaultsMapped,path,newValue);
        });
        return defaultsMapped;
    }
    private convertTwClassesToStyleOverride(value: TwClasses){
        return {
            partial: true,
            tailwind: value,
        };
    }
}

class StyleOverrideCombiner {
    public combineStyles(baseObj: BaseStylesProp, overrideObj: BaseStylesProp): BaseStylesProp{
        console.log('combining styles', baseObj, overrideObj);
        const newObj = {...baseObj};
        traverseObject(overrideObj, (key:string|number, value: any, path: string[], parent:object)=>{
            // console.log('transversing with...',key,value,path);
            if (!value) return;
            const theseKeys = Object.keys(value);
            const isStyleOverrideObj = (theseKeys.includes('partial'));
            if (!isStyleOverrideObj) return;
            this.overridePartial(newObj,path,value.partial);
            // console.log('in object conversion transveral... got these keys', theseKeys);
            if (!value.partial){//FULL OVERRIDE
                _.set(newObj,[...path,'tailwind'], value.tailwind);
                _.set(newObj, [...path,'tailwindRemovals'], value.tailwindRemovals);
            } else {
            this.applyAndClearRemovals(_.get(newObj,path));
            this.overrideTailwind(newObj,path,value.tailwind);
            this.setTailwindRemovals(newObj, path, value.tailwindRemovals);
            }
        });
        return newObj;
    };
    private overridePartial(obj: BaseStylesProp, path: string[],newVal: boolean): void{
        _.set(obj, [...path,'partial'],newVal);
    }
    private applyAndClearRemovals(obj: StyleOverride): void{
        const rems = obj.tailwindRemovals;
        if (!rems || !rems.length) return;
        const adds = obj.tailwind;
        if (!adds || !adds.length) return;
        obj.tailwind = adds.filter(className => !rems.find(exp => className.match(exp)));
        obj.tailwindRemovals = undefined;
    }
    private overrideTailwind(obj: BaseStylesProp, path: string[],newVal: TwClasses | undefined):void{
        if (!newVal || !newVal.length)return;
        const existingTw: TwClasses | undefined = _.get(obj, [...path, 'tailwind']);
        if (!existingTw || !existingTw.length) {
            _.set(obj, [...path,'tailwind'], newVal);
            return;
        }
        const combinedLists = [...existingTw, ...newVal];
        const dedupedLists = combinedLists.filter((item,index) => (combinedLists.lastIndexOf(item) == index)); //Keep the last item to respect the list order, which is important (classnames coming later override those previous in the same categories);
        _.set(obj, [...path, 'tailwind'],dedupedLists);
    }
    private setTailwindRemovals(obj: BaseStylesProp, path: string[],newVal: RegExp[]): void{
        if (!newVal || !newVal.length) return;
        _.set(obj,[...path,'tailwindRemovals'], newVal);
    }
}

class ClassNameCalculator {
    private obj;
    public constructor(obj?: StyleOverride){
        this.obj = obj;
    }
    public getString(){
        if (!this.obj) return '';
        //apply removals to classnames
        const classNamesList = this.obj.tailwindRemovals?this.getFilteredClassNames():this.obj.tailwind;
        //use twcascade to get the classname
        return twCascade(classNamesList);
    }
    private getFilteredClassNames(){
        if (!this.obj) return [];
        const rems = this.obj.tailwindRemovals;
        if (!rems || !rems.length) return this.obj.tailwind;
        const adds = this.obj.tailwind;
        if (!adds || !adds.length) return [];
        return  adds.filter(className => !rems.find(exp => className.match(exp)));
    }
}











