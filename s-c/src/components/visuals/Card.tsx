import React, { DetailedHTMLProps, AllHTMLAttributes, useState, useEffect } from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import Button from '../inputs/Button';
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
    Button: {
        main: twParse`
        bg-black
    `
    }
};

interface CardProps extends ReusableComponentBase {}
const Card: React.FunctionComponent<CardProps> = ({ children, styles }) => {
  const tw = useClassNameManager(styles, DefaultCss);

  const [test, setTest] = useState(false);

  useEffect(()=>{
    if (!test && tw.inject && tw.removeInjection) {
        tw.inject('Button.main',['text-red']);
        tw.removeInjection('Button.main',['text-black']);
    } else if (test && tw.inject && tw.removeInjection) {
        tw.inject('Button.main',['text-black']);
        tw.removeInjection('Button.main',['text-red']);
    }
  },[test, tw.inject, tw.removeInjection]);

  return <div className={tw.getString('main')}>
      <Button styles={tw.getObj('Button')} onClick={()=>setTest(prev=>!prev)}>button</Button>
      {children}
      </div>;
};
export default Card;
