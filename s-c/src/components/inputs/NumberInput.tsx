import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import GeneralInput, { GeneralInputProps } from './GeneralInput';

const DefaultTw = {
  main: twParse``,
};

interface NumberInputProps extends GeneralInputProps {
}

const NumberInput: React.FunctionComponent<NumberInputProps> = (props) => {
  const classNames = useClassNameManager(props.styles, DefaultTw);

  return (
    <GeneralInput
      styles={classNames.getObj('main')}
      {...props}
      type="number"
    >
    </GeneralInput>
  );
};
export default NumberInput;
