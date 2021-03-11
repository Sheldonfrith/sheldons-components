import React, { useEffect, useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultCss = {
  main: twParse`
  w-full 
  bg-secondary
  text-primary 
  rounded 
  font-bold 
  tracking-wide 
  elevation-1 
  uppercase 
  text-sm 
  transition 
  duration-300 
  transform 
  focus:outline-none 
  focus:shadow-outline 
  hover:bg-brown-200
  hover:text-red-500 
  hocus:-translate-y-px 
  hocus:shadow-xl`,
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
    useEffect(()=>{
        //console.log('button mounting');
    },[]);
    useEffect(()=>{
        //console.log('button has new props', styles);
    },[styles]);
  const tw = useClassNameManager(styles, DefaultCss);

  return (
        <button className={tw.getString('main')} onClick={onClick}>
          {children}
        </button>
  );
};
export default Button;
