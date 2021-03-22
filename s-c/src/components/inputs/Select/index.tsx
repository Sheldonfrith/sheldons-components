import React, {useState, useEffect, useContext, useCallback, useRef, ReactNode} from 'react';
import SimpleSelect from './Simple';
import StyledSelect from './Styled';
import MultiSelect from './Multi';
import { ReusableComponentBase, StyleOverride } from '../../../lib/typeHelpers';

export type Option = {
    id: number | string;
    value: string | number;
    content: ReactNode;
  };
export type SelectTypes = (
    "simple" |
    "multi" |
    "styled"
);

interface BaseSelectProps extends ReusableComponentBase{
    options: Option[] |undefined
    placeholder?: string
}
interface SingleSelectBaseProps extends BaseSelectProps{
    selected: Option | undefined | null
    onChange: (newOption: Option | undefined) => any;
}
export interface SimpleSelectProps extends SingleSelectBaseProps{
    type: 'simple'
    styles?:{
        select: StyleOverride   
        option: StyleOverride
    }
}
export interface StyledSelectProps extends SingleSelectBaseProps{
    type: 'styled'
    styles?: {
        Container: StyleOverride
        SelectedOptionDisplay: {
            main: StyleOverride},
        DropdownContainer: {
            main: StyleOverride},
        DropdownItem: {
            main: StyleOverride};
    }
}
export interface MultiSelectProps extends BaseSelectProps{
    type: 'multi'
    selected: Option[] | undefined | null
    onChange: (newOptions: Option[]| undefined)=>any;
    styles?: {
        Container: StyleOverride
        SelectedOptionDisplay: {
            main: StyleOverride}
        ItemWithXToRemove: {
            container: StyleOverride
            textContainer: StyleOverride
            icon: StyleOverride
        }
        DropdownContainer:{
            main: StyleOverride
        }
        DropdownItem: {
            main: StyleOverride
        }
    }
}
type SelectProps = SimpleSelectProps | MultiSelectProps | StyledSelectProps;


const Select: React.FunctionComponent<SelectProps> =(props)=> {
    switch(props.type){
        case 'multi':
            return <MultiSelect {...props}>{props.children}</MultiSelect>
        case 'styled':
            return <StyledSelect {...props}>{props.children}</StyledSelect>
        default:
            return <SimpleSelect {...props}>{props.children}</SimpleSelect>
    }
}
export default Select;
