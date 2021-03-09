import React, { DetailedHTMLProps, AllHTMLAttributes, useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import TailwindCustomizer from '../../lib/StyleCustomizer';
import { ReusableComponentBase } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
const DefaultCss = {
  main: twParse`elevation-2
    w-full
    text-center
    px-8
    rounded-lg 
    shadow
    relative
    pt-2
    text-gray-900
    bg-white
    flex 
    flex-col`,
};

interface CardProps extends ReusableComponentBase {}
const Card: React.FunctionComponent<CardProps> = ({ children, styles }) => {
  const classNames = useClassNameManager(styles, DefaultCss);
  return <div className={classNames.getClassName('main')}>{children}</div>;
};
export default Card;
