import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import styled from 'styled-components';
import {SCPD} from '../../../../lib/typeHelpers';

const Container = styled.div<SCPD>``;

const RemoveIcon = styled.div<SCPD>``;

interface ItemWithXToRemoveProps{
    onClick: any
    containerStyle?: string
    iconStyle?: string
}
const ItemWithXToRemove: React.FunctionComponent<ItemWithXToRemoveProps> =({
    onClick, children, containerStyle, iconStyle
})=> {

return (
<Container onClick={onClick} css={containerStyle}>
    {children}
    <RemoveIcon css={iconStyle}></RemoveIcon>
</Container>
);
}
export default ItemWithXToRemove;
