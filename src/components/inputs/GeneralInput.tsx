import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
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

const Label = styled.label<ScProp>`
${props => props.custCss}
`;

const InputGroup = styled.div<ScProp>`
${props => props.custCss}
`;

const Input = styled.input<ScProp>`
${props => props.custCss}
`;
// const DefaultCss = {
//   main: twParse`
//     flex
//     flex-row
//     items-center
//     justify-between
//     relative
//     `,
//   inputGroup: twParse`
//     flex
//     flex-row
//     items-center
//     justify-between
//     relative
//     m-0
//     p-0
//     `,
//   input: twParse`
//     first:mt-0
//     border-b-0.1
//     focus:outline-none
//     font-medium
//     transition
//     rounded-b-none
//     placeholder-orange-300
//     duration-300 `,
//   label: twParse`
//     `,
//   validationMessage: {
//     main: twParse`
//         absolute
//         -bottom-5
//     `,
//   },
// };
// const variantToColorMap: { [variant: string]: TwClasses } = {
//   neutral: 
//   css`
//     :hover{
//       border-color: 
//     }
//   `
//   [
//     'hover:border-orange-400',
//     'focus:border-orange-400',
//     'focus:text-orange-400',
//     'hover:text-orange-400',
//     'text-orange-600',
//     'border-orange-600',
//   ],
//   inValid: [
//     'hover:border-red-400',
//     'hover:text-red-400',
//     'focus:text-orange-600',
//     'focus:border-red-400',
//     'text-orange-500',
//     'border-red-300',
//   ],
//   valid: [
//     'hover:text-green-400',
//     'focus:text-orange-600',
//     'focus:border-green-400',
//     'hover:border-green-400',
//     'border-green-300',
//     'text-orange-500',
//   ],
// };

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
  onChange: React.ChangeEventHandler<HTMLInputElement>|any
  validInput?: boolean;
  invalidMessage?: string;
  type?: TypesRequiringNoAdditionalStyling
  disableDefaultValidation?: boolean
}
const GeneralInput: React.FunctionComponent<GeneralInputProps> = ({
  styles,
  label,
  validInput,
  invalidMessage,
  disableDefaultValidation,
  children,
  step,
  value,
  type,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localErrorMessage, setLocalErrorMessage] = useState<undefined|string>();
  const instanceId = Math.random();
  const [inputCssOverride, setInputCssOverride] = useState<FlattenSimpleInterpolation|undefined>();

  // useEffect(() => {
  //   if (localErrorMessage === undefined) {
  //     setInputCssOverride(css`${variantToColorMap.neutral}`)
  //     classNames.inject('input', variantToColorMap.neutral);
  //     return;
  //   }
  //   if (localErrorMessage) {
  //     classNames.switchInjection(
  //       'input',
  //       variantToColorMap.inValid,
  //       variantToColorMap.valid
  //     );
  //     return;
  //   }
  // }, [localErrorMessage]);


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
          id={instanceId.toString()}
          custCss={css`${styles?.input}${inputCssOverride}`}
          step={(type==='number')?0.00000000000001:undefined}
          type={type}
          value={(value===undefined)?'':value}
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
