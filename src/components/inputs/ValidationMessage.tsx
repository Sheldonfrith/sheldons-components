import React, {
  
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultTw = {
  main: twParse`
    flex
    flex-row
    justify-start
    items-center
    m-0
    p-0
    text-2
    text-red
  `,
  icon: twParse`
  w-3
  h-3
  `,
  text: twParse``,
};

interface ValidationMessageProps extends ReusableComponentBase {
  text: string;
  styles?: {
    main: StyleOverride;
    icon: StyleOverride;
    text: StyleOverride;
  };
}

const ValidationMessage: React.FunctionComponent<ValidationMessageProps> = ({
  styles,
  text,
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);
  return (
    <div className={classNames.getString('main')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={classNames.getString('icon')}
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      <div className={classNames.getString('text')}>{text}</div>
    </div>
  );
};
export default ValidationMessage;
