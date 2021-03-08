import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import TailwindCustomizer, {  StyleOverride} from '../../../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';

const DefaultCss = 'w-auto elevation-1 cursor-pointer overflow-hidden flex-nowrap h-8 bg-white p-3 s-flex-row space-x-3';

export type SelectedOptionDisplayStyles = {
    container: StyleOverride
}

interface SelectedOptionDisplayProps extends ReusableComponentBase{
    styles?: SelectedOptionDisplayStyles
    onClick: any,
}
const SelectedOptionDisplay: React.FunctionComponent<SelectedOptionDisplayProps> =({
    styles, children, onClick
})=> {
    const [contClassName, setContClassName] = useState(new TailwindCustomizer('',DefaultCss, styles?.container));
return (
<div className={contClassName.getClassName()} onClick={onClick}>
    {children}
</div>
);
}
export default SelectedOptionDisplay;
