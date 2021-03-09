import React, {DetailedHTMLProps, AllHTMLAttributes, useState} from 'react';

export interface ReusableComponentBase {
    styles?: BaseStylesProp
}
export interface BaseStylesProp {
    [componentName: string]: (StyleOverride | BaseStylesProp)
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
