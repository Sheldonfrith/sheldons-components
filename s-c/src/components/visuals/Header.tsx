import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';

import { ReusableComponentBase, StyleDefaults } from '../../lib/typeHelpers';
import {twParse} from '../../lib/functionHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultCss: StyleDefaults = {
    main: twParse`bg-dark`,
};

interface HeaderProps extends ReusableComponentBase {}

const Header: React.FunctionComponent<HeaderProps> = ({ children, styles }) => {

  const classNames = useClassNameManager(styles, DefaultCss);

  return (
    <div
      className={classNames.getClassName('main')}
    >
      {children}
    </div>
  );
};
export default Header;
