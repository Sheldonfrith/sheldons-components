import React, { useState } from 'react';
import TailwindCustomizer from '../../lib/StyleCustomizer';
import {ReusableComponentBase} from '../../lib/typeHelpers';

const DefaultCss = `w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide elevation-1 uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

interface ButtonProps extends ReusableComponentBase{
    onClick: any,
    styleChanges: {
        [componentKey: string]: (currentClassNames: string[])=>any
    }
}
const Button: React.FunctionComponent<ButtonProps> =({
    children, onClick, styles
})=> {

    const [contClassName, setContClassName] = useState(new TailwindCustomizer('', DefaultCss, styles?.container));

return (
<button className={contClassName.getClassName()}  onClick={onClick}>
    {children}
</button>
);
}
export default Button;
