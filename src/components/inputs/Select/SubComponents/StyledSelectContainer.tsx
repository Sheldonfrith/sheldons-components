import React from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import {ScProp} from '../../../../lib/typeHelpers';

const Main = styled.div<ScProp>`
${props => props.custCss}
`;

// const DefaultCss = {
//     main: twParse`
//     relative 
//     text-4 
//     w-14 
//     p-0 
//     m-4
//     flex
//     flex-row
//     items-center
//     justify-center
//     `
// }

export type StyledSelectContainerStyle = {main: string | FlattenSimpleInterpolation};

interface StyledSelectContainerProps extends ReusableComponentBase{
    styles?: StyledSelectContainerStyle
    closeCallback: any
}
const StyledSelectContainer: React.FunctionComponent<StyledSelectContainerProps> =({
    children, styles, closeCallback
})=> {
    const ref = React.useRef(null)

  useOnClickOutside(ref, closeCallback);

return (
<Main ref={ref} custCss={styles?.main}>
    {children}
</Main>
);
}
export default StyledSelectContainer;
