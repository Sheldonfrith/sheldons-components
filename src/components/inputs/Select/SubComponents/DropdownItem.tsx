import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { ReusableComponentBase, ScProp, } from '../../../../lib/typeHelpers';

const Main = styled.div<ScProp>`
${props => props.custCss}
`;


// const DefaultCss = {
//     main: twParse`
//     cursor-pointer
//     hover:bg-orange-100
//     `
// }
export type DropdownItemStyle = {main: string| FlattenSimpleInterpolation}

interface DropdownItemProps extends ReusableComponentBase{
    onClick: any
    isSelected: boolean
    styles?: DropdownItemStyle
}
const DropdownItem: React.FunctionComponent<DropdownItemProps> =({
    //@ts-ignore
    children, onClick, isSelected, styles
})=> {

return (
<Main onClick={onClick}  custCss={styles?.main}>
    {children}
</Main>
);
}
export default DropdownItem;
