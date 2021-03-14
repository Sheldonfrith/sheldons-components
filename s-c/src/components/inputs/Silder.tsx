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
import ReactSlider from 'react-slider';

const DefaultTw = {
  main: twParse``,
  track: twParse`
  bg-transparent
  focus:bg-pink-300
  rounded-full
  h-1
  p-0
  `,
  thumb: twParse`
  h-5
  w-5
  outline-none
  leading-1
  text-center
  bg-pink-500
  rounded-full
  cursor-grab
  hover:bg-pink-600
  focus:bg-pink-600
  `,
  label: twParse``,
  range: twParse`
  w-14
  h-1
  p-0
  rounded-full
  bg-pink-300
  hover:bg-pink-400
  focus:bg-pink-400
  `,
};

interface SliderProps extends ReusableComponentBase {
  step?: number;
  min?: number;
  max?: number;
  onChange: (e: any) => void;
  value: number;
  label?: string;
  styles?: {
    main: StyleOverride;
    label: StyleOverride;
    track: StyleOverride;
    thumb: StyleOverride;
    range: StyleOverride;
  };
}

const Slider: React.FunctionComponent<SliderProps> = ({
  children,
  styles,
  max = 100,
  min = 0,
  step = 1,
  onChange,
  value,
  label,
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);

  const Thumb = useCallback(
    (props: any, state: any) => (
      <div {...props} className={classNames.getString('thumb')}></div>
    ),
    [classNames]
  );

  const Track = useCallback(
    (props: any, state: any) => (
      <div
        {...props}
        index={state.index}
        className={classNames.getString('track')}
      />
    ),
    [classNames]
  );

  return (
    <>
      {label ? (
        <label className={classNames.getString('label')}>{label}</label>
      ) : (
        <></>
      )}
      <ReactSlider
        defaultValue={50}
        renderTrack={Track}
        renderThumb={Thumb}
        className={classNames.getString('range')}
      ></ReactSlider>
      <input
        value={value}
        onChange={onChange}
        max={max}
        min={min}
        step={step}
        type="range"
        className={classNames.getString('main')}
      />
    </>
  );
};
export default Slider;
