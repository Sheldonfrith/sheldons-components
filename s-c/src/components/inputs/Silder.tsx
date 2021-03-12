import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultTw = {
  main: twParse``,
  label: twParse``
};

interface SliderProps extends ReusableComponentBase {
    step?: number
    min?: number
    max?:number
    onChange: React.ChangeEventHandler
    value: number
    label?: string
    styles?: {
        main: StyleOverride
        label: StyleOverride
    }
}

const Slider: React.FunctionComponent<SliderProps> = ({ 
    children, styles ,max=100, min=0, step=1, onChange, value,label
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);


  return (
      <>
      {label?<label className={classNames.getString('label')}>{label}</label>:<></>}
    <input value={value} onChange={onChange} max={max} min={min} step={step} type="range" className={classNames.getString('main')} />
    </>
  );
};
export default Slider;
