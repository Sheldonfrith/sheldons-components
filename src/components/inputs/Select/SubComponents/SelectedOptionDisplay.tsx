import React, { RefObject} from 'react';
import { ReusableComponentBase } from '../../../../lib/typeHelpers';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import {ScProp} from '../../../../lib/typeHelpers';
import {ExpandMore} from '@material-ui/icons';

const Main = styled.div<ScProp>`
${props => props.custCss}
`;
const DownIcon = styled.div<ScProp>`
${props => props.custCss}
`;

const Content = styled.div<ScProp>`
${props => props.custCss}
`;
// const DefaultCss = {
//     main: twParse`
//     w-14
//     elevation-1
//     h-8
//     bg-white
//     flex
//     flex-row
//     items-center
//     justify-between
//     flex-nowrap
//     justify-between
//     s-buttonlike
//     `,
//     downIcon: twParse`
//     gg-chevron-down
//     p-2
//     `,
//     content: twParse`
//       w-14
//       p-2
//       h-8
//       flex
//       flex-row
//       items-center
//       justify-between
//       flex-nowrap
//       justify-center
//     `

// };

export type SelectedOptionDisplayStyle = {
    main?: string | FlattenSimpleInterpolation
    downIcon?: string | FlattenSimpleInterpolation
    content?: string | FlattenSimpleInterpolation
}

interface SelectedOptionDisplayProps extends ReusableComponentBase{
    styles?: SelectedOptionDisplayStyle
    onClick: any,
    scrollAreaRef?: RefObject<HTMLDivElement>
}
const SelectedOptionDisplay: React.FunctionComponent<SelectedOptionDisplayProps> =({
    styles, children, onClick, scrollAreaRef
})=> {



    ////console.log('got these classnames for selectedOptionDisplay',classNames.getString('main'))
return (

        <Main custCss={styles?.main} onClick={onClick}>
            <Content ref={scrollAreaRef} custCss={styles?.content}>
            {children}
            </Content>
            <DownIcon custCss={styles?.downIcon}>
                <ExpandMore/>
            </DownIcon>
        </Main>

);
}




export default SelectedOptionDisplay;
