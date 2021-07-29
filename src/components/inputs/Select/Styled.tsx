import React, {
  useState,
  useEffect,
  
} from 'react';
import Dropdown from './SubComponents/Dropdown';
import DropdownItem from './SubComponents/DropdownItem';
import { Option, StyledSelectProps } from './index';
import SelectedOptionDisplay from './SubComponents/SelectedOptionDisplay';
import Container from './SubComponents/StyledSelectContainer';
import { css, FlattenSimpleInterpolation } from 'styled-components';

const StyledSelect: React.FunctionComponent<StyledSelectProps> = ({
  children,
  options,
  onChange,
  styles,
  selected,
  placeholder
}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  const [selectedOptionDisplayStyleOverride, setSelectedOptionDisplayStyleOverride]= useState<FlattenSimpleInterpolation|undefined>();
  //whenever displayDropdown changes, update the injected styles
  useEffect(()=>{
    if (displayDropdown) {
      setSelectedOptionDisplayStyleOverride(css`border-bottom-right-radius: 0; border-bottom-left-radius: 0;`);
      return;
    }
    setSelectedOptionDisplayStyleOverride(undefined);
  },[displayDropdown]);
  function handleItemClick(option: Option) {
    ////console.log('item clicked in StyledSelect', option);
    onChange(option);
  }
  return (
    <Container
      closeCallback={() => setDisplayDropdown(false)}
      styles={styles?.Container}
    >
      <SelectedOptionDisplay
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={{...styles?.SelectedOptionDisplay, main: css`${styles?.SelectedOptionDisplay.main}${selectedOptionDisplayStyleOverride}`}}
      >
        {selected ? selected.content : placeholder || 'Select an Option'}
      </SelectedOptionDisplay>
      <Dropdown
        display={displayDropdown}
        styles={styles?.DropdownContainer}
      >
        {children
          ? children
          : options?options.map((option: Option) => {
              return (
                <DropdownItem
                  styles={styles?.DropdownItem}
                  key={option.id}
                  onClick={() => {
                    setDisplayDropdown(false);
                    handleItemClick(option);
                  }}
                  isSelected={selected === option}
                >
                  {option.content}
                </DropdownItem>
              );
            }):<></>}
      </Dropdown>
    </Container>
  );
};
export default StyledSelect;
