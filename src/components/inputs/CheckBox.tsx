import React, {
  useEffect,
  MouseEventHandler,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultTw = {
  main: twParse`
  flex
  flex-row
  items-center
  justify-between
  `,
  label: twParse``,
  icon: twParse`
  w-4
  h-4
  p-0
  m-0
  border-0.1
  rounded-full
  s-buttonlike
  `,
};

interface CheckBoxProps extends ReusableComponentBase {
  label?: string;
  checked: boolean;
  onClick?: MouseEventHandler;
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
  checked,
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);

  useEffect(()=>{
    if (checked) classNames.switchInjection('icon',twParse`bg-pink-400`, twParse`bg-pink-200`);
    else classNames.switchInjection('icon',twParse`bg-pink-200`,twParse`bg-pink-400`);
  },[checked]);

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
