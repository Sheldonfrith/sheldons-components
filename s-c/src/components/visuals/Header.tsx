import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';

import {
  ReusableComponentBase,
  StyleDefaults,
  StyleOverride,
} from '../../lib/typeHelpers';
import { twParse } from '../../lib/functionHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultCss: StyleDefaults = {
  main: twParse`
    bg-orange-600 
    text-pink-300 
    flex
    flex-row
    items-center
    justify-between
    w-full `,
    logo: twParse`
    items-center
    flex
    flex-col
    `,
    titleArea: twParse`
    w-15
    flex
    flex-col
    items-start
    `,
    title: twParse`
    uppercase
    `,
    subTitle: twParse`
    italic
    text-3
    text-orange-100
    `,
  navArea: twParse`
    flex
    flex-row
    items-center
    self-end
    justify-end
    w-16
    flex-wrap
    `,
};

interface HeaderProps extends ReusableComponentBase {
  title?: string;
  subTitle?: string;
  logo?: JSX.Element;
  nav?: JSX.Element;
  styles?: {
    main: StyleOverride;
    logo?: StyleOverride;
    titleArea?: StyleOverride;
    title?: StyleOverride;
    subTitle?: StyleOverride;
    navArea: StyleOverride;
  };
}

const Header: React.FunctionComponent<HeaderProps> = ({
  children,
  styles,
  title,
  subTitle,
  logo,
  nav,
}) => {
  const classNames = useClassNameManager(styles, DefaultCss);

  return (
    <div className={classNames.getString('main')}>
      {logo ? (
        <div className={classNames.getString('logo')}>{logo}</div>
      ) : (
        <></>
      )}
      {title || subTitle ? (
        <div className={classNames.getString('titleArea')}>
          {title ? (
            <h1 className={classNames.getString('title')}>{title}</h1>
          ) : (
            <></>
          )}
          {subTitle ? (
            <h3 className={classNames.getString('subTitle')}>{subTitle}</h3>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {nav ? (
        <div className={classNames.getString('navArea')}>{nav}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
export default Header;
