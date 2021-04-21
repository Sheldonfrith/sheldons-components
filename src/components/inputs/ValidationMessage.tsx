import React, {
  
} from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { ReusableComponentBase } from '../../lib/typeHelpers';
import styled from 'styled-components';
import {ScProp} from '../../lib/typeHelpers';

// const DefaultTw = {
//   main: twParse`
//     flex
//     flex-row
//     justify-start
//     items-center
//     m-0
//     p-0
//     text-2
//     text-red
//   `,
//   icon: twParse`
//   w-3
//   h-3
//   `,
//   text: twParse``,
// };
const Main = styled.div<ScProp>`
${props => props.custCss}
`;

const Text = styled.div<ScProp>`
${props => props.custCss}
`;


export type ValidationMessageStyle = {
  main?: string | FlattenSimpleInterpolation
  text?: string | FlattenSimpleInterpolation
}

interface ValidationMessageProps extends ReusableComponentBase {
  text: string;
  styles?: ValidationMessageStyle
}

const ValidationMessage: React.FunctionComponent<ValidationMessageProps> = ({
  styles,
  text,
}) => {
  return (
    <Main custCss={styles?.main}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      <Text custCss={styles?.text}>{text}</Text>
    </Main>
  );
};
export default ValidationMessage;
