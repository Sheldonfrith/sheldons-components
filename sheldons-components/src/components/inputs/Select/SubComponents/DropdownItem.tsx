import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import styled from 'styled-components';
import {SCPD} from '../../../../lib/typeHelpers';

const ItemContainer = styled.div<SCPD>``;

interface DropdownItemProps{
    onClick: any
    isSelected: boolean
    containerStyle?: string
}
const DropdownItem: React.FunctionComponent<DropdownItemProps> =({
    children, onClick, isSelected, containerStyle
})=> {

return (
<ItemContainer onClick={onClick} css={containerStyle}>
    {children}
</ItemContainer>
);
}
export default DropdownItem;
