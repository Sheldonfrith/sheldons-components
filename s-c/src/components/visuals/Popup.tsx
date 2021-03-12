import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import Card from './Card';
import { ReusableComponentBase } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import { twParse } from '../../lib/functionHelpers';

const DefaultStyle = {
  Card: {
    main: twParse`bg-red-200 z-30 p-6`,
  },
  exitButton: twParse`absolute z-40 top-3 right-0 gg-close cursor-pointer hover:text-red-500`,
};
interface PopupProps extends ReusableComponentBase {
  onClose: () => void;
}
const Popup: React.FunctionComponent<PopupProps> = ({
  children,
  styles,
  onClose,
}) => {
  const classNames = useClassNameManager(styles, DefaultStyle);
  return (
    <div className="absolute">
      <Card styles={classNames.getObj('Card')}>{children}</Card>
      <div
        className={classNames.getString('exitButton')}
        onClick={() => onClose()}
      ></div>
    </div>
  );
};
export default Popup;
