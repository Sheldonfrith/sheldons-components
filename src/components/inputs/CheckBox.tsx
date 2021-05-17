import React, {
  MouseEventHandler,
} from 'react';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';

// const DefaultTw = {
//   main: twParse`
//   flex
//   flex-row
//   items-center
//   justify-between
//   `,
//   label: twParse``,
//   icon: twParse`
//   w-4
//   h-4
//   p-0
//   m-0
//   border-0.1
//   rounded-full
//   s-buttonlike
//   `,
// };

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
  label,
  onClick,
}) => {


  return (
    <div onClick={onClick} >
      <div >{children}</div>
      {label ? (
        <label >{label}</label>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CheckBox;
