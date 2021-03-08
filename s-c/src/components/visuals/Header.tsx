import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import TailwindCustomizer, {
  StyleOverride,
} from '../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../lib/typeHelpers';

const DefaultCss = `h1`;

interface HeaderProps extends ReusableComponentBase {}

const Header: React.FunctionComponent<HeaderProps> = ({ children, styles }) => {
  const [contClassName, setContClassName] = useState(
    new TailwindCustomizer('', DefaultCss, styles?.container)
  );

  return (
    <div
      className={contClassName.getClassName()}
      
    >
      {children}
    </div>
  );
};
export default Header;
