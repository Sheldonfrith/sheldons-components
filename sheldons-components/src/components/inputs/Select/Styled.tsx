import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import styled from 'styled-components';
import Dropdown from './SubComponents/Dropdown';
import DropdownItem from './SubComponents/DropdownItem';
import {Option} from './index';
import {SCPD} from '../../../lib/typeHelpers';
import SelectedOptionDisplay from './SubComponents/SelectedOptionDisplay';
import Container from './SubComponents/StyledSelectContainer';


interface StyledSelectProps {
  options: Option[];
  selectedOption: Option | null | undefined
  onChange: (newOption: Option | undefined) => any;
  containerStyle?: string
  selectedOptionDisplayStyle?: string
  dropdownContainerStyle?: string
    dropdownItemStyle?: string
}
const StyledSelect: React.FunctionComponent<StyledSelectProps> = ({
  children,
  options,
  onChange,
  selectedOption,
  containerStyle,
  selectedOptionDisplayStyle,
  dropdownContainerStyle,
  dropdownItemStyle
}) => {

  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  function getOptionByValue(value: string) {
    return options.find((option: Option) => option.value === value);
  }
  function handleItemClick(option: Option) {
    onChange(option);
  }
  return (
    <Container containerStyle={containerStyle}>
      <SelectedOptionDisplay onClick={()=>setDisplayDropdown(prev =>!prev)} containerStyle={selectedOptionDisplayStyle}>
        {selectedOption?
            selectedOption.content
            :"Select an Option"
        }
      </SelectedOptionDisplay>
      <Dropdown display={displayDropdown} closeCallback={()=>setDisplayDropdown(false)} containerStyle={dropdownContainerStyle}>
        {children
          ? children
          : options.map((option: Option) => {
              return (
                <DropdownItem containerStyle={dropdownItemStyle} key={option.id} onClick={()=>{handleItemClick(option)}} isSelected={(selectedOption === option)}>
                  {option.content}
                </DropdownItem>
              );
            })}
      </Dropdown>
    </Container>
  );
};
export default StyledSelect;
