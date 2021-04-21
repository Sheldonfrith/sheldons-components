import React, {
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import GeneralInput, { GeneralInputProps } from './GeneralInput';
import  { SimpleSelectProps } from './Select';
import {unit} from 'mathjs';

// const DefaultTw = {
//   main: {
//     input: twParse`
//       max-w-10
//     `
//   },
//   staticUnitLabel: twParse`
  
//   `,
// };

export interface NumberInputProps extends GeneralInputProps {
  outputUnit?: string
  allowedUnits?: string[]
  setUnitSelectProps?: React.Dispatch<SetStateAction<SimpleSelectProps|undefined>>
  value: number
  step?: undefined
  decimals?: number
}

const NumberInput: React.FunctionComponent<NumberInputProps> = ({
  outputUnit,
  allowedUnits,
  value,
  onChange,
  max,
  min,
  setUnitSelectProps,
  decimals,
  ...props
}) => {
  const withUnits= (outputUnit && allowedUnits?.length);
  const [convertedValue, setConvertedValue] = useState<number|undefined>(value);
  const [selectedUnit, setSelectedUnit] = useState<string|undefined>(outputUnit);
  //convert value to selected unit and decimal places
  useEffect(()=>{
    if (!withUnits || !selectedUnit || value === null || value === undefined) {
      console.log('value changed, but shouldnt convert it',value);
      return;
    }
    else {
      console.log('value changed, and should convert it',value);
      let convertedValue = unit(value,outputUnit!).toNumber(selectedUnit);
      if (outputUnit === selectedUnit) convertedValue = value; // this deals with a mathjs bug
      setConvertedValue(convertedValue);
    }
  },[withUnits, value, selectedUnit, outputUnit, setConvertedValue]);


  //trims value to decimals
  useEffect(()=>{
    if (decimals === undefined || !value) return; 
    if (countDecimals(value) <= decimals) return;
    const trimmedValue = Number(value).toFixed(decimals);
    onChange({target: {value: trimmedValue}});
  },[decimals,value, onChange]);

  function countDecimals (value:number) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1]?.length || 0;
    }

  function convertedOnChange(e:any){
    if (!selectedUnit || !withUnits || (allowedUnits?.length ===1)) 
    {
      onChange(e); 
      return; 
    }
    else {
      let newVal = e.target.value;
      const uncoverted = unit(newVal,selectedUnit);
      let converted = uncoverted.toNumber(outputUnit!);
      if (selectedUnit === outputUnit) converted = newVal;// this removes a bug with the mathjs library when converting identical units
      console.log('done converting new value,',newVal, converted);
      onChange({target: {value: converted}});
    }  
  }

  function convertToSelected(input: number |undefined){
    if (!input || !selectedUnit || !outputUnit || (allowedUnits?.length ===1)) return input;
    const converted = unit(input,outputUnit).toNumber(selectedUnit);
    return converted;
  }


  function handleChange(e:any){
    console.log('change detected with ',e.target.value);
    
    withUnits?convertedOnChange(e):onChange(e);
  }
 
  if (setUnitSelectProps){
    setUnitSelectProps({
      type: 'simple',
      options: allowedUnits!.map(unit=>({id: unit, value: unit, content: unit})),
      selected: selectedUnit?{id: selectedUnit, value: selectedUnit, content: selectedUnit}:undefined,
      onChange: (newOption)=> {
        if (typeof newOption?.value === 'string') setSelectedUnit(newOption.value);
      }
    })
  }

  return (
    <GeneralInput
      value={withUnits?convertedValue:value}
      onChange={handleChange}
      max={withUnits?convertToSelected(Number(max)):max}
      min={withUnits?convertToSelected(Number(min)):min}
      type='number'
      {...props}
    >
    </GeneralInput>
  );
};
export default NumberInput;
