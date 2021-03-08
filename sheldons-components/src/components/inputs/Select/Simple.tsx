import React, {useState, useEffect, useContext, useCallback, useRef, ChangeEvent} from 'react';
import {Option} from './index';
import styled from 'styled-components';
import {SCPD} from '../../../lib/typeHelpers';

const Select = styled.select<SCPD>``;

const Option = styled.option<SCPD>``;

interface SimpleSelectProps{
    options: Option[]
    selectedOption: Option | null | undefined
    onChange: (newOption: Option|undefined)=> any
    selectStyle?: string
    optionStyle?: string
}
const SimpleSelect: React.FunctionComponent<SimpleSelectProps> =({
    children, options,onChange, selectedOption, selectStyle, optionStyle
})=> {
const [internalSelectedOption, setInternalSelectedOption] = useState(selectedOption);
const [value, setValue] = useState<undefined|string>(undefined);

//whenever selected option or internal selected option change ,change value
useEffect(()=>{
    if (selectedOption) setValue(selectedOption.value);
    if (internalSelectedOption) setValue(internalSelectedOption.value);
    setValue(undefined);
},[selectedOption, internalSelectedOption])

function getOptionByValue(value: string){
    return options.find((option: Option) => option.value === value);
}
function handleChange(e: ChangeEvent<HTMLSelectElement> ){
    const option = getOptionByValue(e.target.value);
    onChange(option);
    setInternalSelectedOption(option);
}
return (
<Select 
    value={value} 
    onChange={handleChange}
    css={selectStyle}
>
    {children? children: 
        options.map((option: Option)=>{
            return (
                <Option css={optionStyle} key={option.id} value={option.value}>{option.content}</Option>
            );
        })}
</Select>
);
}
export default SimpleSelect;
