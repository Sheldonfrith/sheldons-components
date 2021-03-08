import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import SimpleSelect from './Simple';
import StyledSelect from './Styled';
import MultiSelect from './Multi';

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

interface BaseSelectProps {
    options: Option[]
}
interface SingleSelectBaseProps extends BaseSelectProps{
    selectedOption: Option | undefined | null
    onChange: (newOption: Option | undefined) => any;
}
interface SimpleSelectProps extends SingleSelectBaseProps{
    type: SelectTypes.Simple
    selectStyle?: string
    optionStyle?: string
}
interface StyledSelectProps extends SingleSelectBaseProps{
    type: SelectTypes.Styled
    containerStyle?: string
    selectedOptionDisplayStyle?: string
    dropdownContainerStyle?: string
    dropdownItemStyle?: string
}
interface MultiSelectProps extends BaseSelectProps{
    type: SelectTypes.Multi
    selectedOptions: Option[] | undefined | null
    onChange: (newOptions: Option[]| undefined)=>any;
    containerStyle?: string
    selectedOptionDisplayStyle?: string
    itemWithXToRemoveStyle?: string
    itemWithXToRemoveIconStyle?: string
    dropdownContainerStyle?: string
    dropdownItemStyle?: string
}
type SelectProps = SimpleSelectProps | MultiSelectProps | StyledSelectProps;


const Select: React.FunctionComponent<SelectProps> =(props)=> {
    switch(props.type){
        case SelectTypes.Multi:
            return <MultiSelect options={props.options} selectedOptions={props.selectedOptions} onChange={props.onChange}>{props.children}</MultiSelect>
        case SelectTypes.Styled:
            return <StyledSelect options={props.options} selectedOption={props.selectedOption} onChange={props.onChange}>{props.children}</StyledSelect>
        default:
            return <SimpleSelect options={props.options} selectedOption={props.selectedOption} onChange={props.onChange}>{props.children}</SimpleSelect>
    }
}
export default Select;
