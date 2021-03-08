import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { themeGet } from '@styled-system/theme-get'

const ButtonElement = styled.button`
`;

interface ButtonProps{
    onClick: any,
}
const Button: React.FunctionComponent<ButtonProps> =({
    children, onClick
})=> {

return (
<ButtonElement  onClick={onClick}>
    {children}
</ButtonElement>
);
}
export default Button;
