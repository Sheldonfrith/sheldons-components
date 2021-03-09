import React, { useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import TailwindCustomizer from '../../lib/StyleCustomizer';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultCss = {
  main: twParse`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide elevation-1 uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`,
};

interface ButtonProps extends ReusableComponentBase {
  onClick: any;
  styles?: {
    main: StyleOverride;
  };
}
const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  styles,
}) => {
  const classNames = useClassNameManager(styles, DefaultCss);

  return (
    <button className={classNames.getClassName('main')} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
