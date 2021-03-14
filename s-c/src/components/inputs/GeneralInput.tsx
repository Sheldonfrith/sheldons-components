import React, { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { twParse } from '../../lib/functionHelpers';
import {
  BaseStylesProp,
  ReusableComponentBase,
  StyleOverride,
  TwClasses,
} from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import ValidationMessage from './ValidationMessage';

const DefaultCss = {
  main: twParse`
    s-flex-row
    `,
  inputGroup: twParse`
    s-flex-col
    relative
    m-0
    p-0
    `,
  input: twParse`
    first:mt-0
    border-b-0.1
    focus:outline-none
    font-medium
    transition
    rounded-b-none
    placeholder-orange-300
    duration-300 `,
  label: twParse`
    `,
  validationMessage: {
    main: twParse`
        absolute
        -bottom-5
    `,
  },
};
const variantToColorMap: { [variant: string]: TwClasses } = {
  neutral: [
    'hover:border-orange-400',
    'focus:border-orange-400',
    'focus:text-orange-400',
    'hover:text-orange-400',
    'text-orange-600',
    'border-orange-600',
  ],
  inValid: [
    'hover:border-red-400',
    'hover:text-red-400',
    'focus:text-orange-600',
    'focus:border-red-400',
    'text-orange-500',
    'border-red-300',
  ],
  valid: [
    'hover:text-green-400',
    'focus:text-orange-600',
    'focus:border-green-400',
    'hover:border-green-400',
    'border-green-300',
    'text-orange-500',
  ],
};

type TypesRequiringNoAdditionalStyling = (
    'email'|
    'hidden'|
    'month'|
    'number'|
    'password'|
    'tel'|
    'text'|
    'url'|
    'time'|
    'week'
);

export interface GeneralInputProps extends ReusableComponentBase, InputHTMLAttributes<HTMLInputElement> {
  styles?: {
    main: StyleOverride;
    inputGroup: StyleOverride;
    label?: StyleOverride;
    input: StyleOverride;
    validationMessage?: BaseStylesProp;
  };
  label?: string;
  validInput?: boolean;
  invalidMessage?: string;
  type?: TypesRequiringNoAdditionalStyling
}
const GeneralInput: React.FunctionComponent<GeneralInputProps> = ({
  styles,
  label,
  validInput,
  invalidMessage,
  ...otherProps
}) => {
  const classNames = useClassNameManager(styles, DefaultCss);

  useEffect(() => {
    console.log('is valid input', validInput);
    if (validInput === undefined) {
      classNames.inject('input', variantToColorMap.neutral);
      return;
    }
    if (validInput === false) {
      classNames.switchInjection(
        'input',
        variantToColorMap.inValid,
        variantToColorMap.valid
      );
      return;
    }
    if (validInput === true) {
      classNames.switchInjection(
        'input',
        variantToColorMap.valid,
        variantToColorMap.inValid
      );
      return;
    }
  }, [validInput]);

 

  return (
    <div className={classNames.getString('main')}>
      {label ? (
        <label className={classNames.getString('label')}>{label}</label>
      ) : (
        <></>
      )}
      <div className={classNames.getString('inputGroup')}>
        <input
          className={classNames.getString('input')}
          {...otherProps}
        />
        {invalidMessage && validInput === false ? (
          <ValidationMessage
            text={invalidMessage}
            styles={classNames.getObj('validationMessage')}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default GeneralInput;
