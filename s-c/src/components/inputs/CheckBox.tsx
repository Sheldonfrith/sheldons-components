import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  MouseEventHandler,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultTw = {
  main: twParse`s-flex-row`,
  label: twParse``,
  icon: twParse`w-3 h-3`,
};

interface CheckBoxProps extends ReusableComponentBase {
  label?: string;
  checked: boolean;
  onClick: MouseEventHandler;
  styles?: {
    main: StyleOverride;
    label: StyleOverride;
    icon: StyleOverride;
  };
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  children,
  styles,
  label,
  onClick,
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);
  return (
    <div onClick={onClick} className={classNames.getString('main')}>
      <div className={classNames.getString('icon')}>{children}</div>
      {label ? (
        <label className={classNames.getString('label')}>{label}</label>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CheckBox;
