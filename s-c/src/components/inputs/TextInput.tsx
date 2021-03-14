import React, { useEffect, useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import {BaseStylesProp, ReusableComponentBase, StyleOverride, TwClasses} from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import ValidationMessage from './ValidationMessage';

const DefaultCss = {
    main: twParse`
    s-flex-row
    `,
    inputGroup: twParse`
    s-flex-col
    relative
    m-0
    p-0
    `,
    input: twParse`
    first:mt-0 
    border-b-0.1 
    focus:outline-none 
    font-medium 
    transition 
    rounded-b-none
    placeholder-brown-300
    duration-300 `,
    label: twParse`
    `,
    validationMessage: {
        main: twParse`
        absolute
        -bottom-5
    `,}
}
  const variantToColorMap: { [variant: string]: TwClasses } = {
      neutral: [
        'hover:border-brown-400',
        'focus:border-brown-400',
        'focus:text-brown-400',
        'hover:text-brown-400',
        'text-brown-600',
        'border-brown-600',
      ],
    inValid: [
        'hover:border-red-400',
        'hover:text-red-400',
        'focus:text-brown-600',
        'focus:border-red-400',
        'text-brown-500',
        'border-red-300'
    ],
    valid: [
        'hover:text-green-400',
        'focus:text-brown-600',
        'focus:border-green-400',
        'hover:border-green-400',
        'border-green-300',
        'text-brown-500'
    ],
  };

interface TextInputProps extends ReusableComponentBase{
    type?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
    placeholder?: string
    valueIsDefault?: boolean
    styles?: {
        main: StyleOverride
        inputGroup: StyleOverride
        label?: StyleOverride
        input: StyleOverride
        validationMessage?: BaseStylesProp
    }
    label?: string
    validInput?: boolean
    invalidMessage?: string
}
const TextInput: React.FunctionComponent<TextInputProps> =({
     type, onChange, value, placeholder, valueIsDefault, styles, label, validInput, invalidMessage
})=> {
    const classNames = useClassNameManager(styles, DefaultCss);

    useEffect(()=>{
        console.log('is valid input', validInput);
        if (validInput === undefined) {classNames.inject('input',variantToColorMap.neutral);return;}        
        if (validInput === false) {classNames.switchInjection('input',variantToColorMap.inValid, variantToColorMap.valid);return;}
        if (validInput === true) {classNames.switchInjection('input',variantToColorMap.valid, variantToColorMap.inValid);return}
    },[validInput]);

    function getElementProps (){
        const obj: {[key: string]: any}= {};
        obj['type'] = type || "text";
        obj['onChange'] = onChange;
        obj['placeholder'] = placeholder;
        if (valueIsDefault){
            obj['defaultValue'] = value;
        } else {
            obj['value'] = value;
        }
        console.log('got these props for text input: ',obj);
        return obj;
    }

return (
    <div className={classNames.getString('main')}>
{label?<label className={classNames.getString('label')} >{label}</label>:<></>}
<div className={classNames.getString('inputGroup')}>
<input 
className={classNames.getString('input')} 
    {...getElementProps()}    
/>
{(invalidMessage && validInput === false)?<ValidationMessage text={invalidMessage} styles={classNames.getObj('validationMessage')}/>:<></>}
</div>
</div>
);
}
export default TextInput;
