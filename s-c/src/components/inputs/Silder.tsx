import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  InputHTMLAttributes,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { BaseStylesProp, ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import ReactSlider from 'react-slider';
import GeneralInput from './GeneralInput';

const DefaultTw = {
  main: twParse`
    w-16
    flex
    flex-row
    items-center
  `,
  track: twParse`
  bg-transparent
  p-0
  m-0
  cursor-pointer
  `,
  thumb: twParse`
  h-4
  w-4
  p-0
  m-0
  outline-none
  leading-1
  text-center
  text-white
  bg-pink-500
  rounded-full
  cursor-grab
  hover:bg-pink-600
  focus:bg-pink-600
  `,
  label: twParse`w-14`,
  range: twParse`
  w-full
  h-1
  p-0
  rounded-full
  bg-pink-300
  hover:bg-pink-400
  focus:bg-pink-400
  flex
  items-center
  cursor-pointer
  `,
  valueDisplay: twParse`
  w-10
  `,
};


interface SliderProps extends ReusableComponentBase, InputHTMLAttributes<HTMLInputElement> {
  step?: number;
  min?: number;
  max?: number;
  onChange: (e: any) => void;
  value: number;
  label?: string;
  showExactValue?: boolean;
  directInput?: boolean;
  styles?: {
    main: StyleOverride;
    label?: StyleOverride;
    track: StyleOverride;
    thumb: StyleOverride;
    range: StyleOverride;
    directInput?: BaseStylesProp;
    valueDisplay?: StyleOverride;
  };
}
const onFocus = [`bg-pink-400`, `bg-pink-600`];



const Slider: React.FunctionComponent<SliderProps> = ({
  styles,
  onChange,
  value,
  directInput,
  showExactValue,
  label,
  max,
  min,
  step = 1,
  ...inputProps
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (isFocused) {
      classNames.inject('range', [onFocus[0]]);
      classNames.inject('thumb', [onFocus[1]]);
    } else {
      classNames.removeInjection('range', [onFocus[0]]);
      classNames.removeInjection('thumb', [onFocus[1]]);
    }
  }, [isFocused]);

  const Thumb = useCallback(
    (props: any, state: any) => (
      <div {...props} className={classNames.getString('thumb')}>
        
      </div>
    ),
    [classNames]
  );

  const Track = useCallback(
    (props: any, state: any) => (
      <div
        {...props}
        
        className={classNames.getString('track')}
      />
    ),
    [classNames]
  );
  
  //constrain value to be always within max and min
  useEffect(()=>{
    if ((max || max ===0)&& (min || min===0)) {
      if (value > max) {onChange({target: {value: max}}); return;}
      if (value < min) {onChange({target:{value:min}}); return;}
    } 
  },[value, max,min]);
  //ensure max - min is evenly divisible with step
  useEffect(()=>{
    let range: number|null = null;
    try {
      //@ts-ignore
      range = max-min;
    }catch(error){}
    if (!range) return;
    if (!(range % step === 0)) throw new Error ('Error in slider component, max-min(range) is not evenly divisible by step');
  },[min, max, step]);


  return (
    <div className={classNames.getString('main')} >
      {label ? (
        <label className={classNames.getString('label')}>{label}</label>
      ) : (
        <></>
      )}
      <ReactSlider
        value={value}
        min={min}
        max={max}
        // step={step}
        onChange={(val:any)=>{
          onChange({target: {value: val}})
        }}
        renderTrack={Track}
        renderThumb={Thumb}
        onBeforeChange={() => {
          setIsFocused(true);
        }}
        onAfterChange={() => {
          setIsFocused(false);
        }}
        className={classNames.getString('range')}
      ></ReactSlider>
      {(showExactValue || directInput)?
        directInput?
        <GeneralInput
        {...inputProps}
          styles={classNames.getObj('directInput')}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          type="number"
          ></GeneralInput>
        :
        <div 
          className={classNames.getString('valueDisplay')}
          >{value}</div>
      :<></>}
    </div>
  );
};
export default Slider;
