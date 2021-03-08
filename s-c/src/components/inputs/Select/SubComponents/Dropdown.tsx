import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import TailwindCustomizer, {  StyleOverride} from '../../../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';


const DefaultCss = "bg-secondary elevation-1 p-3 rounded-t-none";

interface DropdownProps extends ReusableComponentBase{
    styles?: {
        container: StyleOverride
    }
    display: boolean
}
const Dropdown: React.FunctionComponent<DropdownProps> =({children, styles, display})=> {
const [contClassName, setContClassName] = useState(new TailwindCustomizer('',DefaultCss, styles?.container));
if (display){
return (
<div className={contClassName.getClassName()}  >
    {children}
</div>
);
} else {
    return <></>
}
}


export default Dropdown;
