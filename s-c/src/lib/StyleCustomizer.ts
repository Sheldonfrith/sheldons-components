import { twCascade } from '@mariusmarais/tailwind-cascade';
import parseStyle from 'style-to-object';
import {CSSProperties } from 'react';
import {StyleOverride} from './typeHelpers';
// export function parseCss(style: string | StyleOverride | undefined): CSSProperties{
//     if (!style) return {};
//     if (typeof style === 'string') return parseStyle(style)||{};
//     else return (style && style.css)?parseStyle(style.css)||{}:{};
// }


export default class TailwindCustomizer {
    private newStyle: string | string[] | null = null;
    private defaultStyle: string | string[];
    private isPartial: boolean = false;
    private className: string | undefined;
    private removals: RegExp[] | undefined = undefined;


    public constructor(className: string | undefined, defaultStyle: string, styleOverride?: StyleOverride ){
        this.defaultStyle = defaultStyle;
        this.className = className;
        if (styleOverride) {
            this.newStyle = styleOverride.tailwind || null;
            this.isPartial = styleOverride.partial;
            if (styleOverride.tailwindRemoveClasses) this.removals = this.formatRemovals(styleOverride.tailwindRemoveClasses);
        }
        if (this.isPartial){
            this.defaultStyle = this.tailwindStringToArray(this.defaultStyle);
            if (this.removals){
                this.defaultStyle = this.filterWithRemovals(this.defaultStyle);
            }
        }
    }
    public getClassName(): string{
        if (!this.newStyle) return this.tailwindArrayToString(this.defaultStyle);
        if (this.isPartial) return this.getClassNamePartialOverride();
        return this.getClassNameFullOverride() || '';
    }
    private getClassNamePartialOverride(){
        return this.combineDefaultAndNewStyle();
    }
    private getClassNameFullOverride(){
        if (!this.newStyle) return this.className;
        else if (!Array.isArray(this.newStyle)) return this.newStyle;
        else return twCascade(...this.beforeTwCascade(this.newStyle), this.className);
    }
    private tailwindStringToArray(string: string | string[]): string[]{
        if (Array.isArray(string)) {return string;}
        return string.split(/\s+/);
    }
    private tailwindArrayToString(arr: string[] | string): string{
        if (!Array.isArray(arr)) return arr;
        return arr.join(' ');
    }
    private combineDefaultAndNewStyle(){
        return twCascade(
            ...this.beforeTwCascade(this.defaultStyle),
            ...this.beforeTwCascade(this.newStyle),
            this.className
        );
    }
    private beforeTwCascade(val: string | string[] | undefined | null){
        if (!val) return [''];
        if (typeof val === 'string') return this.tailwindStringToArray(val);
        else return this.splitArrayStringsBySpacesInPlace(val);
    }
    private formatRemovals(removals: string | string[] | RegExp[]): RegExp[]{
        if (typeof removals === "string") return this.stringArrayToRegExpArray(this.tailwindStringToArray(removals));
        //@ts-ignore
        else if (Array.isArray(removals)&& typeof removals[0] === 'string') return this.stringArrayToRegExpArray(removals);
        else if (!removals[0]) return [];
        //@ts-ignore
        else return removals;
    }
    private stringArrayToRegExpArray(stringArray: string[]){
        return stringArray.map(str => new RegExp(str));
    }
    private filterWithRemovals(arr: string[]){
        if (!this.removals) return arr;
        else return arr.filter(str => !this.removals!.find(regexp => str.match(regexp)));
    }
    private splitArrayStringsBySpacesInPlace(arr: string[]){
        const spaceTest = /\s/;
        const duplicateArr  = [...arr];
        arr.forEach((str:string, i: number)=>{
            if (str.match(spaceTest)){
                const subArr = this.tailwindStringToArray(str);
                duplicateArr.splice(i,0,...subArr);
            }
        });
        return duplicateArr;
    }
}