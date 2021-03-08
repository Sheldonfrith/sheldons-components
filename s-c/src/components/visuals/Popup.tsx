import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import Card from './Card';
import TailwindCustomizer from '../../lib/StyleCustomizer';
import {ReusableComponentBase} from '../../lib/typeHelpers';

const DefaultStyle = `absolute bg-red-200`;

interface PopupProps extends ReusableComponentBase{
}
const Popup: React.FunctionComponent<PopupProps> =({
    children,styles
})=> {
    const [contClassName, setContClassName] = useState(new TailwindCustomizer('',DefaultStyle, styles?.container))

return (
<Card styles={{container:{partial: true, tailwind: contClassName.getClassName()}}}>
    {children}
</Card>
);
}
export default Popup;
