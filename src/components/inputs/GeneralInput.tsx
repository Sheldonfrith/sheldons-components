import React, { InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react';
import { css, FlattenSimpleInterpolation } from 'styled-components';
import {
  ReusableComponentBase,
} from '../../lib/typeHelpers';
import ValidationMessage, { ValidationMessageStyle } from './ValidationMessage';
import styled from 'styled-components';
import {ScProp} from '../../lib/typeHelpers';
const Main = styled.div<ScProp>`
${props => props.custCss}
`;

const Label = styled.div<ScProp>`
${props => props.custCss}
`;

const InputGroup = styled.div<ScProp>`
${props => props.custCss}
`;

const Input = styled.input<ScProp>`
${props => props.custCss}
`;

type TypesRequiringNoAdditionalStyling = (
    'email'|
    'hidden'|
    'month'|
    'number'|
    'password'|
    'tel'|
    'text'|
    'url'|
    'time'|
    'week'
);

export interface GeneralInputProps extends ReusableComponentBase, InputHTMLAttributes<HTMLInputElement> {
  styles?: {
    main: string | FlattenSimpleInterpolation;
    inputGroup: string | FlattenSimpleInterpolation;
    label?: string | FlattenSimpleInterpolation;
    input: string | FlattenSimpleInterpolation;
    validationMessage?: ValidationMessageStyle;
  };
  label?: string;
  // onChange: React.ChangeEventHandler<HTMLInputElement>|any
  validInput?: boolean;
  invalidMessage?: string;
  type?: TypesRequiringNoAdditionalStyling
  disableDefaultValidation?: boolean
  setInputIsFocused?: React.Dispatch<SetStateAction<boolean>>
}
const GeneralInput: React.FunctionComponent<GeneralInputProps> = ({
  styles,
  label,
  validInput,
  invalidMessage,
  disableDefaultValidation,
  children,
  value,
  type,
  step,
  setInputIsFocused,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localErrorMessage, setLocalErrorMessage] = useState<undefined|string>();
  const instanceId = Math.random();
  const [inputCssOverride, setInputCssOverride] = useState<FlattenSimpleInterpolation|undefined>();




 //disable scroll on the input if its a number with no step
 useEffect(()=>{
  if (type==='number' && !step){
    document.getElementById(instanceId.toString())?.addEventListener('wheel',preventDefaultScroll);
  } else {
    document.getElementById(instanceId.toString())?.removeEventListener('wheel',preventDefaultScroll);
  }
  function preventDefaultScroll(event:any){
    event.preventDefault();
  }
 },[type, step]);

 //disable step arrows when step is 0 or undefined
 useEffect(()=>{

  setInputCssOverride(css`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `);
 },[step]);

 //whenever input validity changes, alter local validity and message
 useEffect(()=>{
   if (!inputRef.current) return;
   const browserSaysItsValid = (inputRef.current?.validity.valid);
   const browsersErrorMessage = inputRef.current?.validationMessage;
   const propsSayItsValid = !(validInput===false);
   const shouldShowErrorMessage = (!propsSayItsValid  || disableDefaultValidation?false:!browserSaysItsValid);
   console.log('shouldshow error message? ',shouldShowErrorMessage, browserSaysItsValid, browsersErrorMessage, propsSayItsValid);
   if (shouldShowErrorMessage){
     console.log('input is invalid, showing error message');
     setLocalErrorMessage(invalidMessage||browsersErrorMessage);
   } else {
     setLocalErrorMessage(undefined);
   }
 },[inputRef.current, value, disableDefaultValidation, invalidMessage, validInput]);

  return (
    <Main custCss={styles?.main}>
      {label ? (
        <Label custCss={styles?.label}>{label}</Label>
      ) : (
        <></>
      )}
      <InputGroup custCss={styles?.inputGroup}>
        <Input
          ref={inputRef}
          onBlur={()=>setInputIsFocused?setInputIsFocused(false):null}
          onFocus={()=>setInputIsFocused?setInputIsFocused(true):null}
          id={instanceId.toString()}
          custCss={css`${styles?.input}${inputCssOverride}`}
          type={type}
          value={(value===undefined)?'':value}
          step={step}
          {...otherProps}
        />
      </InputGroup>
      {children}
        {localErrorMessage ? (
          <ValidationMessage
            text={localErrorMessage}
            styles={styles?.validationMessage}
          />
        ) : (
          <></>
        )}
    </Main>
  );
};
export default GeneralInput;
