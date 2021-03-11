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
import { Option, StyledSelectProps } from './index';
import SelectedOptionDisplay from './SubComponents/SelectedOptionDisplay';
import Container from './SubComponents/StyledSelectContainer';
import useClassNameManager from '../../../lib/useClassNameManager';
import { twParse } from '../../../lib/functionHelpers';

const StyledSelect: React.FunctionComponent<StyledSelectProps> = ({
  children,
  options,
  onChange,
  styles,
  selected,
}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  const classNames = useClassNameManager(styles, undefined);

  //whenever displayDropdown changes, update the injected styles
  useEffect(()=>{
    if (displayDropdown) {classNames.inject('SelectedOptionDisplay.main',twParse`rounded-b-none`); return;}
    classNames.removeInjection('SelectedOptionDisplay.main',twParse`rounded-b-none`);
  },[displayDropdown]);

  function handleItemClick(option: Option) {
    //console.log('item clicked in StyledSelect', option);
    onChange(option);
  }
  return (
    <Container
      closeCallback={() => setDisplayDropdown(false)}
      styles={classNames.getObj('Container')}
    >
      <SelectedOptionDisplay
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={classNames.getObj('SelectedOptionDisplay')}
      >
        {selected ? selected.content : 'Select an Option'}
      </SelectedOptionDisplay>
      <Dropdown
        display={displayDropdown}
        styles={classNames.getObj('DropdownContainer')}
      >
        {children
          ? children
          : options.map((option: Option) => {
              return (
                <DropdownItem
                  styles={classNames.getObj('DropdownItem')}
                  key={option.id}
                  onClick={() => {
                    handleItemClick(option);
                  }}
                  isSelected={selected === option}
                >
                  {option.content}
                </DropdownItem>
              );
            })}
      </Dropdown>
    </Container>
  );
};
export default StyledSelect;
