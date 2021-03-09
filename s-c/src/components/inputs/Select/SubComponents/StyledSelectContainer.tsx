import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { twParse } from '../../../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../../../lib/typeHelpers';
import useClassNameManager from '../../../../lib/useClassNameManager';

const DefaultCss = {
    main: twParse`text-4 `
}


interface StyledSelectContainerProps extends ReusableComponentBase{
    styles?: {
        main: StyleOverride
    }
    closeCallback: any
}
const StyledSelectContainer: React.FunctionComponent<StyledSelectContainerProps> =({
    children, styles, closeCallback
})=> {
    const ref = React.useRef(null)

  useOnClickOutside(ref, closeCallback);
const classNames = useClassNameManager(styles, DefaultCss);

return (
<div ref={ref} className={classNames.getClassName('main')}>
    {children}
</div>
);
}
export default StyledSelectContainer;
