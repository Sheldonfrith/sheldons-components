import React, {DetailedHTMLProps, AllHTMLAttributes, useState} from 'react';

export interface ReusableComponentBase {
    styles?: BaseStylesProp
}
export interface BaseStylesProp {
    [componentName: string]: StyleOverride
}
export interface StyleOverride {
    partial: boolean
    tailwind?: TwClasses
    tailwindRemoveClasses?: TwClasses
}
export type TwClasses = string | string[];