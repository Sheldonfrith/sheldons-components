import React, { DetailedHTMLProps, AllHTMLAttributes, useState, useEffect } from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import Button from '../inputs/Button';
const DefaultCss = {
  main: twParse`elevation-2
    text-center
    rounded-lg 
    shadow
    relative
    text-gray-900
    bg-white
    flex
    flex-col
    items-center
    `
};

interface CardProps extends ReusableComponentBase {}
const Card: React.FunctionComponent<CardProps> = ({ children, styles }) => {
  const tw = useClassNameManager(styles, DefaultCss);

 

  return <div className={tw.getString('main')}>
      
      {children}
      </div>;
};
export default Card;
