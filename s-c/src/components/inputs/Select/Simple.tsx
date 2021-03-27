import React, {
  useState,
  useEffect,
 
  ChangeEvent,
} from 'react';
import { Option, SimpleSelectProps } from './index';
import { twParse } from '../../../lib/functionHelpers';
import useClassNameManager from '../../../lib/useClassNameManager';

const DefaultCss = {
    select: twParse``,
    option: twParse``,
}

const SimpleSelect: React.FunctionComponent<SimpleSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
  placeholder,
}) => {
  const [internalSelectedOption, setInternalSelectedOption] = useState(
    selected
  );
  const [value, setValue] = useState<undefined | string|number>(undefined);
    const classNames = useClassNameManager(styles, DefaultCss);
  //whenever selected option or internal selected option change ,change value
  useEffect(() => {
    if (selected) setValue(selected.value);
    if (internalSelectedOption) setValue(internalSelectedOption.value);
    setValue(placeholder);
  }, [selected, internalSelectedOption]);

  function getOptionByValue(value: string) {
    return options?.find((option: Option) => option.value === value);
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const option = getOptionByValue(e.target.value);
    onChange(option);
    setInternalSelectedOption(option);
  }


  return (
    <select
      value={value}
      onChange={handleChange}
      className={classNames.getString('select')}
    >
      {children
        ? children
        : options? options.map((option: Option) => {
            return (
              <option
                key={option.id}
                value={option.value}
                className={classNames.getString('option')}
                
              >
                {option.content}
              </option>
            );
          }):<></>}
    </select>
  );
};
export default SimpleSelect;
