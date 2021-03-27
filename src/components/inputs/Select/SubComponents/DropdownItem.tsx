import React from 'react';
import { twParse } from '../../../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../../../lib/typeHelpers';
import useClassNameManager from '../../../../lib/useClassNameManager';

const DefaultCss = {
    main: twParse`
    cursor-pointer
    hover:bg-orange-100
    `
}


interface DropdownItemProps extends ReusableComponentBase{
    onClick: any
    isSelected: boolean
    styles?: {
        main: StyleOverride
    }
}
const DropdownItem: React.FunctionComponent<DropdownItemProps> =({
    //@ts-ignore
    children, onClick, isSelected, styles
})=> {
    const classNames = useClassNameManager(styles, DefaultCss);

return (
<div onClick={onClick} className={classNames.getString('main')} >
    {children}
</div>
);
}
export default DropdownItem;
