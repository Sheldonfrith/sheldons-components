import React, {Dispatch, useEffect, useState}  from "react";
import TailwindCustomizer from "./StyleCustomizer";
import {BaseStylesProp, StyleDefaults, StyleOverride, TwClasses} from './typeHelpers';
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

    public constructor(initialStylesProp?:BaseStylesProp, initialDefaults?: StyleDefaults, setStateFunc: Dispatch<React.SetStateAction<BaseStylesProp|undefined>>):void{
        this.initPropStyles = initialStylesProp;
        this.initDefaultStyles = initialDefaults;
        this.setCalculatedStyles = setStateFunc;
        const initCalculator = new StylePropsCalculator(this.initPropStyles, initialDefaults);
        this.calculatedStyles = initCalculator.get();
    }
    public getClassName(path: string):string{
        const targetObject: object = this.getObj(path);
        const isStyleOverrideObj = (Object.keys(targetObject).includes('partial'));
        if (!isStyleOverrideObj) throw new Error('invalid object given to getClassName in ClassNamesManager');
        const nameCalculator = new ClassNameCalculator(targetObject as StyleOverride);
        return nameCalculator.getString();
    }
    public getObj(path: string):BaseStylesProp{
        return _.get(this.calculatedStyles, path);
    }
    public partial(path: string, value: boolean):void{
        _.set(this.calculatedStyles,`${path}.partial`,value)
        this.updateState();
    }
    public remove(path: string, regExToRemove: RegExp[]):void{
        _.update(this.calculatedStyles, `${path}.tailwindRemoveClasses`, function(classList: RegExp[]){return[...classList, ...regExToRemove];});
        this.updateState();
    }
    public add(path: string, classesToAdd: TwClasses):void{
        _.update(this.calculatedStyles, `${path}.tailwind`, function(classList: TwClasses){
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
        const defaultsObj = this.getObjectFromDefaults();
        const combiner = new StyleOverrideCombiner();
        return combiner.combineStyles(defaultsObj, this.initPropStyles);
    }
    
    private getObjectFromDefaults(): BaseStylesProp{
        const defaultsMapped = {};
        traverseObject(this.initDefaultStyles, (key:string|number,value:any, path:string[],parent: object)=>{
            const isStringArray= (Array.isArray(value) && value.length && typeof value[0] === 'string');
            const isTwClasses = (isStringArray);
            if (!isTwClasses) return;
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
        const newObj = {...baseObj};
        traverseObject(overrideObj, (key:string|number, value: any, path: string[], parent:object)=>{
            const theseKeys = Object.keys(value);
            const isStyleOverrideObj = (theseKeys.includes('partial'));
            if (!isStyleOverrideObj) return;
            this.overridePartial(newObj,path,value.partial);
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
    public constructor(obj: StyleOverride){
        this.obj = obj;
    }
    public getString(){
        //apply removals to classnames
        const classNamesList = this.obj.tailwindRemovals?this.getFilteredClassNames():this.obj.tailwind;
        //use twcascade to get the classname
        return twCascade(classNamesList);
    }
    private getFilteredClassNames(){
        const rems = this.obj.tailwindRemovals;
        if (!rems || !rems.length) return this.obj.tailwind;
        const adds = this.obj.tailwind;
        if (!adds || !adds.length) return [];
        return  adds.filter(className => !rems.find(exp => className.match(exp)));
    }
}















//incoming props
        //holds StyleOverride objects for each of the defined sub-components in this component
    
    //changing props within the component...
        //call classNames.add(Component,class(es)ToAdd);
        //or call classNames.remove(Component, class(es)ToRemove);
    
    //on each of the sub-components: className={classNames.get(Component)}
export function useClassNames(stylesProp: BaseStylesProp, defaults: StyleDefaults,alwaysSubmissive: boolean){
   const [localStyleOverrides, setLocalStyleOverrides] = useState<BaseStylesProp>(createEmptyBaseStylesProp(stylesProp));
   const [propAndDefaultStyles, setPropAndDefaultStyles]= useState<BaseStylesProp>(getPropAndDefaultStyles());
   function getStylesProp(Comp: React.FunctionComponent){
        return stylesProp[Comp.name]; //TODO plus defaults and Local Styles which can be defined anywhere along the tree
    }
    function getString(Comp: JSX.Element){
        return addLocalStylesAndGetString(propAndDefaultStyles, localStyleOverrides);
    }
    const manager =  new ClassNamesManager(unchangingClassNames);
    return [add, remove, get];
}

function getPropAndDefaultStyles(stylesProp: BaseStylesProp, defaults: StyleDefaults){
    
    //incoming props will never be a string
    // if the incoming props 

    //Ex stylesProp: {
    //     WrapperdivWithCustomName: {
    //         partial: true,
    //         tailwind: 'stheushu'
    //     },
    //     InternalReactComponent: {// cannot have any styles of its own, only base elements can       
                //     divWithCustomName: {
                //         partial: false,
                //         tailwind: ',.p,.p.,u',
                //         tailwindRemovals: ',uoeu',
                //     },
                //     buttonWithCustomName: {
                //         partial: true,
                //         tailwind: 'oeusthueos'
                //     }
    //     }
    // }

    //Ex Output: {
        select: {

        }
    }


    const returnObj: BaseStylesProp = {};
    Object.keys(stylesProp).forEach(componentKey =>{
        const prop = stylesProp[componentKey];
        const defaultStyles = defaults[componentKey];
        const getter = new TailwindCustomizer('',defaultStyles,prop);
        const subObj = prop.subComponents||{};
        subComponents.forEach(subComponent => subObj[subComponent] = createStyleOverride())
        returnObj[componentKey]  = {
            components.forEach()
            getter.getClassName();
        }
    });
}

{
    SelectContainer : {
        subComponents: {
            Select: {

            }
        }
    }
}

function createStyleOverride(partial: boolean, tailwind?: TwClasses, tailwindRemoveClasses?: TwClasses){
    return {
        partial: partial,
        tailwind: tailwind,
        tailwindRemoveClasses: tailwindRemoveClasses
    };
}



function add(Comp: React.FunctionComponent, toAdd: TwClasses){
    if (this.alwaysSubmissive) return this.submissiveAdd(Comp, toAdd);

}
//will only add if a compelete classname overwrite has not been requested from higher in the component tree
function submissiveAdd(Comp:React.FunctionComponent, toAdd: TwClasses){
    if (!this.classesFromPropsAndDefault[Comp.name].partial) return;
    else return this.add(Comp, toAdd);
}
function remove(Comp: React.FunctionComponent, toRemove: TwClasses){
    if (this.alwaysSubmissive) return this.submissiveRemove(Comp, toRemove);
}
//will only remove if a complete classname overwrite has not been requested from higher in the component tree
function submissiveRemove(Comp: React.FunctionComponent, toRemove: TwClasses){
    if (!this.classesFromPropsAndDefault[Comp.name].partial) return;
    else return this.add(Comp,toRemove);
}


const nullStyleOverride: StyleOverride = {partial: true, tailwind: []};

function createEmptyBaseStylesProp(actualStylesProp: BaseStylesProp){
    const returnObj: BaseStylesProp = {};
    Object.keys(actualStylesProp).forEach((componentKey: string)=> returnObj[componentKey] = nullStyleOverride);
    return returnObj;
}

class ClassNamesManager1 {
    private classesFromPropsAndDefault: BaseStylesProp;
    private classesFromLocal: BaseStylesProp = {};
    private alwaysSubmissive: boolean;
    public constructor(stylesProp: BaseStylesProp, alwaysSubmissive: boolean = false){
        this.alwaysSubmissive = alwaysSubmissive;
        this.classesFromPropsAndDefault = stylesProp;
        this.setupClassesFromLocal();
    }
    private setupClassesFromLocal(){
        Object.keys(this.classesFromPropsAndDefault).forEach((componentKey: string)=> this.classesFromLocal[componentKey] = this.nullStyleOverride);
    }
    
    private getCompNameAndPropTypes(Component: React.FunctionComponent){
        const compName = Component.name;
        return [compName, CompProps];
    }
}

function classNames(component: React.FunctionComponent){
    const componentName = component.name;
    type ComponentProps = React.ComponentProps<typeof component>;
}

function removeClassNameFromConditionalClassNames(nameToRemove:string | RegExp, componentKey: string){
    const regExp = (typeof nameToRemove === 'string')?new RegExp(nameToRemove):nameToRemove;
    setConditionalClassNames(prev =>{
      const targetArr = prev[componentKey];
      if (!targetArr) return prev;
      const filteredArr = targetArr.filter((str:string)=>!str.match(regExp));
      const needsToChange = (filteredArr.length!==targetArr.length);
      if (!needsToChange) return prev;
      const newPrev = {...prev};
      newPrev[componentKey] = filteredArr;
      return newPrev;
    });
  }
  function addClassNameToConditionalClassNames(nameToAdd: string, componentKey: string){
    setConditionalClassNames(prev =>{
      const targetArr = prev[componentKey]||[];
      if (targetArr.find((str:string)=>str.match(new RegExp(nameToAdd)))) return prev;
      targetArr.push(nameToAdd);
      const newPrev = {...prev};
      newPrev[componentKey] = targetArr;
      return newPrev;
    });
  }
  function addToTailwindField(obj: StyleOverride, toAdd: string | string[]): StyleOverride{
    const returnObj: StyleOverride = {...obj};
    const toAddAsArr: string[] = Array.isArray(toAdd)?toAdd:[toAdd];
    if (obj.tailwind){
      if (Array.isArray(obj.tailwind)){
        returnObj.tailwind = [...obj.tailwind, ...toAddAsArr]
      } else {
        returnObj.tailwind = [obj.tailwind, ...toAddAsArr]
      }
    } else {
      returnObj['tailwind'] = toAdd;
    }
    return returnObj;
  }

  function passStyles<T extends BaseStylesProp>(newKey: string, val: StyleOverride, existingObj?: {[key:string]:StyleOverride}):T{
    const returnObj: {[key:string]:StyleOverride} = existingObj?{...existingObj}:{};
    returnObj[newKey] = val;
    return returnObj as T;
  }

  //'rounded-b-none'
  const getStylesWithInjections = useCallback(function<T extends BaseStylesProp>(oldComponentKey: keyof typeof styles, newComponentKey: string):T|undefined {
    const stylesToAdd = conditionalClassNames[oldComponentKey]||[];
    const externalStyles = styles?styles[oldComponentKey]:undefined;
    if (styles && externalStyles) {
        return passStyles<T>(newComponentKey,addToTailwindField(externalStyles, stylesToAdd));
    } else {
      return passStyles<T>(newComponentKey,{ partial: true, tailwind: stylesToAdd});
    }
  },[conditionalClassNames, styles]);

