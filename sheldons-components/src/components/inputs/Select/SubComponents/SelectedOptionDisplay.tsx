import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import styled from 'styled-components';
import {SCPD} from '../../../../lib/typeHelpers';

const Container = styled.div<SCPD>``;

interface SelectedOptionDisplayProps{
    containerStyle?: string
    onClick: any,
}
const SelectedOptionDisplay: React.FunctionComponent<SelectedOptionDisplayProps> =({
    containerStyle, children, onClick
})=> {

return (
<Container css={containerStyle} onClick={onClick}>
    {children}
</Container>
);
}
export default SelectedOptionDisplay;
