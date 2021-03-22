import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import { twParse } from '../../../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../../../lib/typeHelpers';
import useClassNameManager from '../../../../lib/useClassNameManager';


const DefaultCss = {
    main: twParse`
    z-20 
    absolute 
    top-3/4 
    w-14 
    bg-white 
    elevation-1 
    px-2 
    py-0
    rounded-t-none`
}

interface DropdownProps extends ReusableComponentBase{
    styles?: {
        main: StyleOverride
    }
    display: boolean
}
const Dropdown: React.FunctionComponent<DropdownProps> =({children, styles, display})=> {
const classNames = useClassNameManager(styles, DefaultCss);

if (display){
return (
<div className={classNames.getString('main')}>
    {children}
</div>
);
} else {
    return <></>
}
}


export default Dropdown;
