import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import Card from './Card';
import {ReusableComponentBase} from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import { twParse } from '../../lib/functionHelpers';

const DefaultStyle = {
    Card: twParse`absolute bg-red-200`
}
interface PopupProps extends ReusableComponentBase{
}
const Popup: React.FunctionComponent<PopupProps> =({
    children,styles
})=> {
    const classNames = useClassNameManager(styles, DefaultStyle);
return (
<Card styles={classNames.getObj('Card')}>
    {children}
</Card>
);
}
export default Popup;
