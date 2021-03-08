import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
// import styled from 'styled-components';
import {SCPD} from '../../../../lib/typeHelpers';
import useOnClickOutside from 'use-onclickoutside'
import tw, { styled } from 'twin.macro';

const Container = styled.div(({css})=>[
    tw`
        absolute
        bg-gray-200
    `,
    css
]);


interface DropdownProps{
    containerStyle?: string
    display: boolean
    closeCallback: any
}
const Dropdown: React.FunctionComponent<DropdownProps> =({children, containerStyle, display, closeCallback})=> {
    const ref = React.useRef(null)
  useOnClickOutside(ref, closeCallback);

if (display){
return (
<Container css={containerStyle} ref={ref}>
    {children}
</Container>
);
} else {
    return <></>
}
}


export default Dropdown;
