import React from 'react';
import { twParse } from '../../../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../../../lib/typeHelpers';
import useClassNameManager from '../../../../lib/useClassNameManager';

const DefaultCss = {
    container: twParse`
    cursor-pointer 
    bg-secondary 
    max-h-full
    flex
    flex-row
    items-center
    justify-between
    p-2 
    space-x-2`,
    icon: twParse`bg-danger w-2 h-2 m-x-2`,
    textContainer: twParse`
        flex-shrink-0
    `,
};

interface ItemWithXToRemoveProps extends ReusableComponentBase{
    onClick: any
    styles?: {
        container: StyleOverride
        textContainer: StyleOverride
        icon: StyleOverride
    } 
}
const ItemWithXToRemove: React.FunctionComponent<ItemWithXToRemoveProps> =({
    onClick, children, styles
})=> {
    const classNames = useClassNameManager(styles, DefaultCss);

return (
<div onClick={onClick} className={classNames.getString('container')} >
    <div className={classNames.getString('textContainer')}>{children}</div>
    <div className="gg-close">
    </div>
</div>
);
}
export default ItemWithXToRemove;
