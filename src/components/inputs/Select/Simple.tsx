import React, {
 
 
  ChangeEvent,
} from 'react';
import { Option, SimpleSelectProps } from './index';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import {ScProp} from '../../../lib/typeHelpers';

const Select = styled.select<ScProp>`
${props => props.custCss}
`;
const OptionEl = styled.option<ScProp>`
${props => props.custCss}
`;

// const DefaultCss = {
//     select: twParse``,
//     option: twParse``,
// }
export type SimpleSelectStyle = {
  select: string | FlattenSimpleInterpolation
  option: string | FlattenSimpleInterpolation
};

const SimpleSelect: React.FunctionComponent<SimpleSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
}) => {

  function getOptionByValue(value: string) {
    return options?.find((option: Option) => option.value === value);
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const option = getOptionByValue(e.target.value);
    onChange(option);
  }


  return (
    <Select
      value={selected?selected.value:undefined}
      onChange={handleChange}
      custCss={styles?.select}
    >
      {children
        ? children
        : options? options.map((option: Option) => {
            return (
              <OptionEl
                custCss={styles?.option}
                key={option.id}
                value={option.value}
                
              >
                {option.content}
              </OptionEl>
            );
          }):<></>}
    </Select>
  );
};
export default SimpleSelect;
