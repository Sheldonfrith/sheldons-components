import React, { useEffect, useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import {ReusableComponentBase, StyleOverride, TwClasses} from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultCss = {
    main: twParse`
    mt-6 
    first:mt-0 
    border-b-0.25 
    focus:outline-none 
    font-medium 
    transition 
    rounded-b-none
    duration-300 
    hocus:border-primary-500`,
    label: twParse`
    `,
}
  const variantToColorMap: { [variant: string]: TwClasses } = {
      neutral: [
        'hover:border-brown-500',
        'focus:border-brown-500',
        'border-brown-600'
      ],
    inValid: [
        'hover:border-red-400',
        'focus:border-red-400',
        'border-red-300'
    ],
    valid: [
        'focus:border-green-400',
        'hover:border-green-400',
        'border-green-300'
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
        label: StyleOverride
    }
    label?: string
    validInput?: boolean
}
const TextInput: React.FunctionComponent<TextInputProps> =({
     type, onChange, value, placeholder, valueIsDefault, styles, label, validInput
})=> {
    const classNames = useClassNameManager(styles, DefaultCss);

    useEffect(()=>{
        if (validInput === undefined)  classNames.inject('main',variantToColorMap.neutral);
        else classNames.removeInjection('main',variantToColorMap.neutral);
        if (validInput) classNames.switchInjection('main',variantToColorMap.valid, variantToColorMap.inValid);
        else classNames.switchInjection('main',variantToColorMap.inValid, variantToColorMap.valid);
    },[validInput])

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
    <>
{label?<label className={classNames.getString('label')} >{label}</label>:<></>}
<input 
className={classNames.getString('main')} 
    {...getElementProps()}    
/>
</>
);
}
export default TextInput;
