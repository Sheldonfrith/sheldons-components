import React, { useEffect } from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';


const DefaultCss = {
  main: twParse`
  min-w-10 
  max-w-16
  bg-orange-100
  text-pink-500 
  rounded 
  font-bold 
  tracking-wide 
  elevation-1 
  uppercase 
  transition 
  duration-300 
  transform 
  focus:outline-none 
  focus:shadow-outline 
  hover:bg-red-200
  hover:text-red-500 
  hocus:-translate-y-px 
  hocus:shadow-xl`,
};

type VariantColor = {
  bg?: string;
  text?: string;
  hoverBg?: string;
  hoverText?: string;
};
const variantToColorMap: { [variant: string]: VariantColor } = {
  action: { bg: 'pink-500', text: 'white', hoverBg: 'pink-600', hoverText: 'white' },
  info: { bg: 'blue-500', text: 'white', hoverBg: 'blue-600' , hoverText: 'white'},
  danger: { bg: 'red-500', text: 'white', hoverBg: 'red-600' ,  hoverText: 'white'},
  success: { bg: 'green-500', text: 'white', hoverBg: 'green-600' , hoverText: 'white'},
};

interface ButtonProps extends ReusableComponentBase {
  onClick?: any;
  styles?: {
    main: StyleOverride;
  };
  variant?: 'action' | 'info' | 'danger' | 'success';
  submit?: boolean
}
const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  styles,
  variant,
  submit
}) => {
  useEffect(() => {
    ////console.log('button mounting');
  }, []);
  useEffect(() => {
    ////console.log('button has new props', styles);
  }, [styles]);
  const tw = useClassNameManager(styles, DefaultCss);

  useEffect(() => {
    if (!variant) return;
    const colors = variantToColorMap[variant];
    tw.inject('main', [
      colors.bg ? `bg-${colors.bg}` : '',
      colors.text ? `text-${colors.text}` : '',
      colors.hoverBg ? `hover:bg-${colors.hoverBg}` : '',
      colors.hoverText ? `hover:text-${colors.hoverText}` : '',
    ]);
  }, [variant]);

  return (
    <button 
    className={tw.getString('main')} 
    onClick={submit?()=>{}:onClick}
    type={submit?'submit':'button'}
    >
      {children}
    </button>
  );
};
export default Button;
