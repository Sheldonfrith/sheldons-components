import React from 'react';

interface TextInputProps{
    type?: string;
    onChange: any,
    value: string,
    placeholder?: string
    valueIsDefault?: boolean
}
const TextInput: React.FunctionComponent<TextInputProps> =({
     type, onChange, value, placeholder, valueIsDefault
})=> {

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
<input 
    {...getElementProps}    
/>
);
}
export default TextInput;
