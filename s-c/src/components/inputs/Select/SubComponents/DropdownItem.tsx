import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import TailwindCustomizer, {  StyleOverride} from '../../../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';

const DefaultCss = 'cursor-pointer';


interface DropdownItemProps extends ReusableComponentBase{
    onClick: any
    isSelected: boolean
    styles?: {
        container: StyleOverride
    }
}
const DropdownItem: React.FunctionComponent<DropdownItemProps> =({
    children, onClick, isSelected, styles
})=> {
    const [contClassName, setContClassName] = useState(new TailwindCustomizer('',DefaultCss, styles?.container));

return (
<div onClick={onClick} className={contClassName.getClassName()} >
    {children}
</div>
);
}
export default DropdownItem;
