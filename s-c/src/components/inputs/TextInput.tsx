import React, { useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import {ReusableComponentBase, StyleOverride} from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultCss = {
    main: twParse`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
}

interface TextInputProps extends ReusableComponentBase{
    type?: string;
    onChange: any,
    value: string,
    placeholder?: string
    valueIsDefault?: boolean
    styles?: {
        main: StyleOverride
    }
}
const TextInput: React.FunctionComponent<TextInputProps> =({
     type, onChange, value, placeholder, valueIsDefault, styles
})=> {
    const classNames = useClassNameManager(styles, DefaultCss);
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
        return obj;
    }

return (
<input className={classNames.getString('main')} 
    {...getElementProps}    
/>
);
}
export default TextInput;
