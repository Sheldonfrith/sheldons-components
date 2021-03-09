import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import SimpleSelect from './Simple';
import StyledSelect from './Styled';
import MultiSelect from './Multi';
import { ReusableComponentBase, StyleOverride } from '../../../lib/typeHelpers';

export type Option = {
    id: number | string;
    value: string;
    content: any;
  };
export enum SelectTypes {
    Simple = "simple",
    Multi = "multi",
    Styled = "styled"
}

interface BaseSelectProps extends ReusableComponentBase{
    options: Option[]
}
interface SingleSelectBaseProps extends BaseSelectProps{
    selected: Option | undefined | null
    onChange: (newOption: Option | undefined) => any;
}
export interface SimpleSelectProps extends SingleSelectBaseProps{
    type: SelectTypes.Simple
    styles:{
        select: StyleOverride   
        option: StyleOverride
    }
}
export interface StyledSelectProps extends SingleSelectBaseProps{
    type: SelectTypes.Styled
    styles: {
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
    type: SelectTypes.Multi
    selected: Option[] | undefined | null
    onChange: (newOptions: Option[]| undefined)=>any;
    styles: {
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
        case SelectTypes.Multi:
            return <MultiSelect {...props}>{props.children}</MultiSelect>
        case SelectTypes.Styled:
            return <StyledSelect {...props}>{props.children}</StyledSelect>
        default:
            return <SimpleSelect {...props}>{props.children}</SimpleSelect>
    }
}
export default Select;
