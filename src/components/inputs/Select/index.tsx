import React, { ReactNode} from 'react';
import SimpleSelect, { SimpleSelectStyle } from './Simple';
import StyledSelect from './Styled';
import MultiSelect from './Multi';
import { ReusableComponentBase} from '../../../lib/typeHelpers';
import { StyledSelectContainerStyle } from './SubComponents/StyledSelectContainer';
import { SelectedOptionDisplayStyle } from './SubComponents/SelectedOptionDisplay';
import { DropdownStyles } from './SubComponents/Dropdown';
import { DropdownItemStyle } from './SubComponents/DropdownItem';
import { ItemWithXToRemoveStyle } from './SubComponents/ItemWithXToRemove';

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
    styles?:SimpleSelectStyle
}
export interface StyledSelectProps extends SingleSelectBaseProps{
    type: 'styled'
    styles?: {
        Container: StyledSelectContainerStyle
        SelectedOptionDisplay: SelectedOptionDisplayStyle
        DropdownContainer: DropdownStyles
        DropdownItem: DropdownItemStyle
    }
}
export interface MultiSelectProps extends BaseSelectProps{
    type: 'multi'
    selected: Option[] | undefined | null
    onChange: (newOptions: Option[]| undefined)=>any;
    styles?: {
        Container: StyledSelectContainerStyle
        SelectedOptionDisplay: SelectedOptionDisplayStyle
        DropdownContainer: DropdownStyles
        DropdownItem: DropdownItemStyle
        ItemWithXToRemove: ItemWithXToRemoveStyle
    }
}
export type SelectProps = SimpleSelectProps | MultiSelectProps | StyledSelectProps;


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
