type ArrayStringNumber = (string|number)[];
type ObjStringNumber = {[key:string]: number | string};
type ArrayOrObjStringNumber = ArrayStringNumber|ObjStringNumber;
enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}
export type Color = {
    light?: string
    default: string
    dark?: string
    medSaturated?: string
    medUnsaturated?: string
}
export type SimpleColors = {
    background: Color
    text: Color
    primary: Color
    secondary: Color
    accent: Color
    secondaryAccent: Color
    black: Color
    white: Color
    grey: Color
    red?: Color
    blue?: Color
    yellow?: Color
    green?: Color
    orange?: Color
    purple?: Color
};
export type NestedColors = {
    [key in ThemeMode]: SimpleColors
};
export type Colors = SimpleColors|NestedColors;
export interface ThemeNoColors {
    breakpoints: {[key: string]: number}|number[]
    borders?: string[]|{[key:string]:string}
    borderStyles?: { [key: string]: string }
    borderWidths?: ArrayOrObjStringNumber
    colors: Colors
    fonts?: { [key: string]: string }
    fontSizes: ArrayOrObjStringNumber
    fontWeights?: { [key: string]: number }|number[]
    letterSpacings?: ArrayOrObjStringNumber
    lineHeights?: ArrayOrObjStringNumber
    radii?: ArrayOrObjStringNumber
    space: ArrayOrObjStringNumber
    sizes: ArrayOrObjStringNumber
    transitionDurations?: { [key: string]: number }
    transitionTiming?: {
      [key: string]: {
        "x1": number,
        "y1": number,
        "x2": number,
        "y2": number,
      }
    }
    zIndices?: { [key: string]: number }
  }
export interface ModedTheme extends ThemeNoColors {
    colors: NestedColors
}
export interface Theme extends ThemeNoColors{
    colors: SimpleColors
}

const theme: Theme = {
    breakpoints: [450, 1000, 2100],
    space: [0, r(0.191), r(0.309), r(0.5), r(0.809), r(1.309), r(2.118), r(3.427), r(5.545), r(8.971)],
    sizes: [0,25,50,75,100],
    colors:{
        background: {default: 'black'},
        text: {default: 'white'},
        primary: {default: 'red'},
        secondary: {default: 'white'},
        accent: {default: 'green'},
        secondaryAccent: {default: 'blue'},
        black: {default: 'black'},
        white: {default: 'white'},
        grey: {default: 'grey'},
    },
    fonts: {
        primary: 'Nadeem',
        secondary: 'monospace|mono'
    },
    fontSizes: [
        r(0.563),
        r(0.75),
        r(1),
        r(1.333),
        r(1.777),
        r(2.369),
        r(3.157),
        r(4.209),
        r(5.61)
    ],
    fontWeights: [
        300,
        500,
        700,
    ],
    lineHeights: [0.5, 1, 1.3, 1.75],
    letterSpacings:[0, 0.7, 1, 1.3, 1.75],
}

function r (value:number){
    return `${value}rem`;
}

export default theme;