import React from 'react';
import { ReusableComponentBase, ScProp } from '../../../../lib/typeHelpers';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

const Main = styled.div<ScProp>`
${props => props.custCss}
`;
const TextContainer = styled.div<ScProp>`
${props => props.custCss}
`;

const Icon = styled.div<ScProp>`
${props => props.custCss}
`;

// const DefaultCss = {
//     container: twParse`
//     cursor-pointer 
//     bg-secondary 
//     max-h-full
//     flex
//     flex-row
//     items-center
//     justify-between
//     p-2 
//     space-x-2`,
//     icon: twParse`bg-danger w-2 h-2 m-x-2`,
//     textContainer: twParse`
//         flex-shrink-0
//     `,
// };

export type ItemWithXToRemoveStyle = {
    main?: string | FlattenSimpleInterpolation
     textContainer?: string | FlattenSimpleInterpolation
      icon?: string | FlattenSimpleInterpolation
};

interface ItemWithXToRemoveProps extends ReusableComponentBase{
    onClick: any
    styles?: ItemWithXToRemoveStyle
}
const ItemWithXToRemove: React.FunctionComponent<ItemWithXToRemoveProps> =({
    onClick, children, styles
})=> {

return (
<Main custCss={styles?.main} onClick={onClick} >
    <TextContainer custCss={styles?.textContainer}>{children}</TextContainer>
    <Icon custCss={styles?.icon} className="gg-close">
    </Icon>
</Main>
);
}
export default ItemWithXToRemove;
