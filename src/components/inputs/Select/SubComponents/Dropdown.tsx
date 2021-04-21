import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { ReusableComponentBase, ScProp,  } from '../../../../lib/typeHelpers';

const Main = styled.div<ScProp>`
    ${props=>props.custCss}    
`;
// const DefaultCss = {
//     main: twParse`
//     absolute 
//     top-3/4 
//     w-14 
//     bg-white 
//     elevation-1 
//     px-2 
//     py-0
//     rounded-t-none`
// }

export type DropdownStyles = {main: string|FlattenSimpleInterpolation};

interface DropdownProps extends ReusableComponentBase{
    styles?: DropdownStyles
    display: boolean
}
const Dropdown: React.FunctionComponent<DropdownProps> =({children, styles, display})=> {

if (display){
return (
<Main custCss={styles?.main}>
    {children}
</Main>
);
} else {
    return <></>
}
}


export default Dropdown;
