import React, {DetailedHTMLProps, AllHTMLAttributes, useState} from 'react';
import TailwindCustomizer from '../../lib/StyleCustomizer';
import {ReusableComponentBase} from '../../lib/typeHelpers';
const DefaultCss =
    `elevation-2
    w-full
    max-w-sm
    mt-16
    lg:mr-8
    lg:last:mr-0
    text-center
    px-8
    rounded-lg 
    shadow
    relative
    pt-2
    text-gray-900
    bg-white
    flex 
    flex-col`;

    interface CardProps extends ReusableComponentBase{
    }
    const Card: React.FunctionComponent<CardProps> =({
        children,styles
    })=> {
        const [classNameGetter, setClassNameGetter] = useState( new TailwindCustomizer('', DefaultCss, styles?.container) )
        
        return (
            <div className={
                classNameGetter.getClassName()
            }
            
>
    {children}
</div>
);
}
export default Card;

