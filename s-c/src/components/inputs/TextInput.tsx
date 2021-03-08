import React, { useState } from 'react';
import TailwindCustomizer from '../../lib/StyleCustomizer';
import {ReusableComponentBase} from '../../lib/typeHelpers';

const DefaultCss = `mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;

interface TextInputProps extends ReusableComponentBase{
    type?: string;
    onChange: any,
    value: string,
    placeholder?: string
    valueIsDefault?: boolean
}
const TextInput: React.FunctionComponent<TextInputProps> =({
     type, onChange, value, placeholder, valueIsDefault, styles
})=> {
    const [contClassName ,setContClassName] = useState(new TailwindCustomizer('', DefaultCss, styles?.container))
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
<input className={contClassName.getClassName()} 
    {...getElementProps}    
/>
);
}
export default TextInput;
