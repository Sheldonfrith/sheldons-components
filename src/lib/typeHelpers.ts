import { FlattenSimpleInterpolation } from "styled-components";

export type ScProp = {custCss?: string | FlattenSimpleInterpolation};


export interface ReusableComponentBase {
    styles?: any
    id?: string
    key?: any
    name?: string
}
export interface BaseStylesProp {
    [componentName: string]: (StyleOverride | BaseStylesProp| undefined)
};
export interface StyleOverride {
    partial: boolean
    tailwind?: TwClasses
    tailwindRemovals?: RegExp[]
}
export type TwClasses = string[];
export interface StyleDefaults {
    [componentKey: string]: TwClasses | StyleDefaults
}
