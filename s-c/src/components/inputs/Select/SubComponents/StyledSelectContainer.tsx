import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import useOnClickOutside from 'use-onclickoutside';
import TailwindCustomizer, {  StyleOverride} from '../../../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';

const DefaultCss = 'text-4 ';


interface StyledSelectContainerProps extends ReusableComponentBase{
    styles?: {
        container: StyleOverride
    }
    closeCallback: any
}
const StyledSelectContainer: React.FunctionComponent<StyledSelectContainerProps> =({
    children, styles, closeCallback
})=> {
    const ref = React.useRef(null)

  useOnClickOutside(ref, closeCallback);
const [contClassName, setContClassName] = useState(new TailwindCustomizer('',DefaultCss, styles?.container));

return (
<div ref={ref} className={contClassName.getClassName()}>
    {children}
</div>
);
}
export default StyledSelectContainer;
