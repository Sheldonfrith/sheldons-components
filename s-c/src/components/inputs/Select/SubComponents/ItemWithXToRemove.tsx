import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import TailwindCustomizer, {  StyleOverride} from '../../../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';

const DefaultCssContainer = 'cursor-pointer bg-secondary max-h-100 s-flex-row p-2 space-x-2';
const DefaultCssIcon = 'bg-danger w-2 h-2 m-x-2';

interface ItemWithXToRemoveProps extends ReusableComponentBase{
    onClick: any
    styles?: {
        container: StyleOverride
        icon: StyleOverride
    } 
}
const ItemWithXToRemove: React.FunctionComponent<ItemWithXToRemoveProps> =({
    onClick, children, styles
})=> {
    const [contClassName, setContClassName] = useState(new TailwindCustomizer('',DefaultCssContainer, styles?.container));
    const [iconClassName, setIconClassName] = useState(new TailwindCustomizer('',DefaultCssIcon, styles?.icon));

return (
<div onClick={onClick} className={contClassName.getClassName()} >
    <div>{children}</div>
    <div className={iconClassName.getClassName()}></div>
</div>
);
}
export default ItemWithXToRemove;
