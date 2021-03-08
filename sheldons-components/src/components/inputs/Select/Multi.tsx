import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    useRef,
    ChangeEvent,
  } from 'react';
  import styled, { ThemedStyledFunction } from 'styled-components';
  import Dropdown from './SubComponents/Dropdown';
  import DropdownItem from './SubComponents/DropdownItem';
  import ItemWithXToRemove from './SubComponents/ItemWithXToRemove';
  import {Option} from './index';
import {SCPD} from '../../../lib/typeHelpers';
import SelectedOptionDisplay from './SubComponents/SelectedOptionDisplay';
import Container from './SubComponents/StyledSelectContainer';

  interface MultiSelectProps {
    options: Option[];
    selectedOptions: Option[]|null|undefined;
    onChange: (newOptions: Option[] | undefined) => any;
    containerStyle?: string
    selectedOptionDisplayStyle?: string
    itemWithXToRemoveStyle?: string
    itemWithXToRemoveIconStyle?: string
    dropdownContainerStyle?: string
    dropdownItemStyle?: string

  }
  const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({
    children,
    options,
    onChange,
    selectedOptions,
    containerStyle,
    selectedOptionDisplayStyle,
    itemWithXToRemoveStyle,
    dropdownContainerStyle,
    dropdownItemStyle,
    itemWithXToRemoveIconStyle
  }) => {

    const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

    function handleItemClick(option: Option) {
        if (selectedOptions?.find(o => o.value === option.value)) return;
    
      onChange(selectedOptions?[...selectedOptions,option]:[option]);
    }
    function handleRemoveItem(option: Option){
        onChange(selectedOptions?.filter(o=>o.value !== option.value));
    }
    return (
      <Container containerStyle={containerStyle}>
        <SelectedOptionDisplay onClick={()=>setDisplayDropdown(prev =>!prev)} containerStyle={selectedOptionDisplayStyle}>
            {
                selectedOptions?selectedOptions.map((option: Option)=> 
                {
                    return (
                        <ItemWithXToRemove containerStyle={itemWithXToRemoveStyle} key={option.id} onClick={()=>handleRemoveItem(option)}>{option.content}</ItemWithXToRemove>
                    );
                }):"Select an Option"
            }
        </SelectedOptionDisplay>
        <Dropdown display={displayDropdown} closeCallback={()=>setDisplayDropdown(false)}>
          {children
            ? children
            : options.map((option: Option) => {
                return (
                  <DropdownItem key={option.id} onClick={()=>{handleItemClick(option)}} isSelected={(selectedOptions?selectedOptions.includes(option):false)}>
                    {option.content}
                  </DropdownItem>
                );
              })}
        </Dropdown>
      </Container>
    );
  };
  export default MultiSelect;
  