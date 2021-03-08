import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { Option, SimpleSelectProps } from './index';
import TailwindCustomizer from '../../../lib/StyleCustomizer';

const DefaultCssSelect = '';
const DefaultCssOption = '';

const SimpleSelect: React.FunctionComponent<SimpleSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
}) => {
  const [internalSelectedOption, setInternalSelectedOption] = useState(
    selected
  );
  const [value, setValue] = useState<undefined | string>(undefined);

  //whenever selected option or internal selected option change ,change value
  useEffect(() => {
    if (selected) setValue(selected.value);
    if (internalSelectedOption) setValue(internalSelectedOption.value);
    setValue(undefined);
  }, [selected, internalSelectedOption]);

  function getOptionByValue(value: string) {
    return options.find((option: Option) => option.value === value);
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const option = getOptionByValue(e.target.value);
    onChange(option);
    setInternalSelectedOption(option);
  }

  const [selectClassName, setSelectClassName] = useState(
    new TailwindCustomizer('', DefaultCssSelect, styles?.select)
  );
  const [optionClassName, setOptionClassName] = useState(
    new TailwindCustomizer('', DefaultCssOption, styles?.option)
  );

  return (
    <select
      value={value}
      onChange={handleChange}
      className={selectClassName.getClassName()}
      
    >
      {children
        ? children
        : options.map((option: Option) => {
            return (
              <option
                key={option.id}
                value={option.value}
                className={optionClassName.getClassName()}
                
              >
                {option.content}
              </option>
            );
          })}
    </select>
  );
};
export default SimpleSelect;
