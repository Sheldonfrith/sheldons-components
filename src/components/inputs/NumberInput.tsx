import React, {
  useState,
  useEffect,
  ChangeEvent,
  SetStateAction,
} from 'react';
import GeneralInput, { GeneralInputProps } from './GeneralInput';
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


//! implement custom conversions... mathjs conversions are very buggy...
// function convertMetreToFt(metreVal:number|undefined){
//   if (metreVal === undefined)return undefined;
//   else return metreVal * 3.28084;
// }
// function convertFtToMetre(ftVal: number|undefined){
//   if (ftVal === undefined) return undefined;
//   else return ftVal * 0.3048;
// }
export function trimDecimalsString(input?: string, decimalsToKeep?: number){
  if (!input || decimalsToKeep === undefined || decimalsToKeep === null) return input;
  const parsed = parseFloat(input)
  if (!parsed || isNaN(parsed)) return input;
  return parsed.toFixed(decimalsToKeep);
}
export function trimDecimalsNumber(input?: number, decimalsToKeep?: number): number | undefined{
  if (!input || isNaN(input)) return input;
  //console.log('trying toFixed on '+input+'. Decimals to keep='+decimalsToKeep);
  const result = input.toFixed(decimalsToKeep);
  if (!result) return undefined;
  return parseFloat(result);
}
export interface NumberInputProps extends GeneralInputProps {
  outputUnit?: string
  selectedUnit?: string
  value?: number
  step?: undefined | string | number
  decimals?: number
  withUnitConversions?: boolean
  onChange?: undefined
  setValue: React.Dispatch<SetStateAction<number|undefined>>
}

const NumberInput: React.FunctionComponent<NumberInputProps> = ({
  outputUnit,
  value,
  setValue,
  max,
  min,
  decimals,
  selectedUnit,
  withUnitConversions,
  ...props
}) => {
  const [localBaseVal, setLocalBaseVal] = useState<number|undefined>(value);
  const [inputIsFocused, setInputIsFocused ] = useState<boolean>(false);
  const [convertedValue, setConvertedValue] = useState<number|undefined>(value);
  //WHEN THE INPUT IS NOT FOCUSED, UPDATE THE LOCAL VALUE FROM THE FOREIGN VALUE (ONE WAY ONLY)
  //WHEN THE INPUT IS FOCUSED, UPDATE THE FOREIGN VALUE FROM THE LOCAL VALUE (ONE WAY ONLY)

  //debugging
  useEffect(()=>{
    //console.log('number input focused?',inputIsFocused);
  },[inputIsFocused]);

  useEffect(()=>{
    //console.log('Number input (Sheldons) is remounting');
  },[])
  //whenever local base value changes, if input is focused, send the update out
  useEffect(()=>{
    //console.log('local base val has changed, might be sending out an update...'+inputIsFocused+','+localBaseVal+','+value);
    if (!inputIsFocused || localBaseVal == value) return;
    //console.log('updating external value, in number input... localVal='+localBaseVal+'externalVal='+ value+'inputIsFocused='+ inputIsFocused);
    setValue(localBaseVal);
  },[localBaseVal,inputIsFocused,setValue, value]);

  //whenever foreign value changes, if input is NOT focus, update the local value
  useEffect(()=>{
    if (inputIsFocused || localBaseVal == value) return;
    //console.log('updating local from external, in number input', value, localBaseVal);
    setLocalBaseVal(value);
  },[value, setLocalBaseVal, inputIsFocused]);

//  //! Following methods and effects apply regardless of whether conversions are active or not

  // //trims value to decimals
  // useEffect(()=>{
  //   if (decimals === undefined || !value) return; 
  //   if (countDecimals(value) <= decimals) return;
  //   const trimmedValue = Number(value).toFixed(decimals);
  //   onChange({target: {value: trimmedValue}});
  // },[decimals,value, onChange]);

  // function countDecimals (value:number) {
  //   if(Math.floor(value) === value) return 0;
  //   return value.toString().split(".")[1]?.length || 0;
  //   }

//   //! Following methods and effects apply only if conversions are INACTIVE
   //When input changes and conversions are active
  //set converted value to new input value
  function handleChange(e: ChangeEvent<HTMLInputElement>){
    //console.log('changing local base value due to user input',e.target.value);
    const newVal = parseFloat(e.target.value);
    const sanitisedNewVal = (isNaN(newVal))?undefined:newVal;
    setLocalBaseVal(sanitisedNewVal===undefined?undefined:trimDecimalsNumber(sanitisedNewVal,10));
  }
  // //whenever base value changes, if not the same as display value ,set display value
  // useEffect(()=>{
  //   if (value == displayValue) return;
  //   setDisplayValue(value);
  // },[value]);

  // //When display value changes, convert it, and if this value is different than base value update base value
  // useEffect(()=>{
  //   if (displayValue != value){
  //      onChange({target: {value: displayValue}});
  //   }
  //  },[displayValue]);


//  //! Following methods and effects only apply if conversions are ACTIVE
function convertToSelected(input: number |undefined){
  if (input == null || input == undefined || !selectedUnit || !outputUnit ) return input;
  if (selectedUnit == outputUnit) return input;
  // if (selectedUnit ==='ft' && outputUnit === 'm'){
    // return convertMetreToFt(input);
  // }
  const converted = unit(input,outputUnit).toNumber(selectedUnit);
  return trimDecimalsNumber(converted, 10);
}

function convertToBase(input: number | undefined){
  if (input ==null || input == undefined || !selectedUnit || !outputUnit) return input;
  if (selectedUnit == outputUnit) return input;
  // if (selectedUnit === 'ft' && outputUnit === 'm'){
    // return convertFtToMetre(input);
  // }
  const converted = unit(input, selectedUnit).toNumber(outputUnit);
  return trimDecimalsNumber(converted,10);
}

  //When input changes and conversions are active
  //set converted value to new input value
  function handleChangeWithConversion(e: React.ChangeEvent<HTMLInputElement>){
    //console.log('changing local value, triggered by user input'+e.target.value);
    const newVal = parseFloat(e.target.value);
    const sanitisedNewVal = (isNaN(newVal))?undefined:newVal;
    setConvertedValue(sanitisedNewVal===undefined?undefined:trimDecimalsNumber(sanitisedNewVal,10));
  }

  ///SAME AS ABOVE, THE UNITS CANNOT CHANGE WHILE THE INPUT IS IN FOCUS (probably 98%)
  //SO DO NOT PULL ANY UPDATES FROM THE LOCALBASEVAL unless the input is in focus
  //and likewise do not send any updates if the input is not in focus
  useEffect(()=>{
    if (!withUnitConversions || inputIsFocused || convertToBase(convertedValue)===localBaseVal) return;
    //console.log('setting converted value from local base value ', localBaseVal);
    setConvertedValue(convertToSelected(localBaseVal));
  },[localBaseVal,inputIsFocused, convertedValue]);

  useEffect(()=>{
    if (!withUnitConversions || !inputIsFocused || convertToBase(convertedValue) === localBaseVal) return;
    //console.log('setting local base value from converted val', convertedValue);
    setLocalBaseVal(convertToBase(convertedValue));
  },[convertedValue, inputIsFocused, localBaseVal])

  //When selected Unit or output unit changes, (INPUT SHOULD NOT BE IN FOCUS) 
  //convert the base value and set this as the new display value
  useEffect(()=>{
    if (inputIsFocused || !withUnitConversions) return;
    if (!selectedUnit && !outputUnit) return;
    //console.log('setting converted value from local base value DUE TO UNIT CHANGE', selectedUnit, outputUnit);
    const convertedVal = convertToSelected(localBaseVal);
    setConvertedValue(convertedVal);
  },[selectedUnit, outputUnit,localBaseVal, inputIsFocused]);



  if (withUnitConversions){
    return (
      <GeneralInput
      {...props}
      setInputIsFocused={setInputIsFocused}
      value={convertedValue}
      onChange={handleChangeWithConversion}
      max={convertToSelected(Number(max))}
      min={convertToSelected(Number(min))}
      type="number"
      />
    );
  } else {
    return (
    <GeneralInput
    {...props}
    setInputIsFocused={setInputIsFocused}

      value={localBaseVal}
      onChange={handleChange}
      max={max}
      min={min}
      type='number'
    >
    </GeneralInput>
  );
  }
  
};
export default NumberInput;
