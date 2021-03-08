import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import tw, { styled } from 'twin.macro';
import {SCPD} from '../../../../lib/typeHelpers';

const Container = styled.div(({css})=>[
    tw`
    relative
    bg-black
    `,
    css
]);

interface StyledSelectContainerProps{
    containerStyle?: string
}
const StyledSelectContainer: React.FunctionComponent<StyledSelectContainerProps> =({
    children, containerStyle
})=> {

return (
<Container css={containerStyle}>
    {children}
</Container>
);
}
export default StyledSelectContainer;
