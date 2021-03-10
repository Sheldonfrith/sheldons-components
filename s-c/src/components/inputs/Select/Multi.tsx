import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import Dropdown from './SubComponents/Dropdown';
import DropdownItem from './SubComponents/DropdownItem';
import ItemWithXToRemove from './SubComponents/ItemWithXToRemove';
import { MultiSelectProps, Option } from './index';
import SelectedOptionDisplay, { SelectedOptionDisplayStyles } from './SubComponents/SelectedOptionDisplay';
import Container from './SubComponents/StyledSelectContainer';
import {twParse}from '../../../lib/functionHelpers';
import useClassNameManager from '../../../lib/useClassNameManager';

const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const classNames = useClassNameManager(styles,undefined)
  //whenever displayDropdown changes, update the injected styles
  useEffect(()=>{
    if (displayDropdown) {classNames.inject('SelectedOptionDisplay.main',twParse`rounded-b-none`); return;}
    classNames.removeInjection('SelectedOptionDisplay.main',twParse`rounded-b-none`);
  },[displayDropdown, classNames]);

  function handleItemClick(option: Option) {
    if (selected?.find(o => o.value === option.value)) return;
    onChange(selected ? [...selected, option] : [option]);
  }
  function handleRemoveItem(option: Option) {
    onChange(selected?.filter(o => o.value !== option.value));
  }

  
  return (
    <Container
      closeCallback={() => setDisplayDropdown(false)}
      // styles={classNames.getObj<React.ComponentProps<typeof Container>>('main')}
      styles={classNames.getObj('main')}
    >
      <SelectedOptionDisplay
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={classNames.getObj('SelectedOptionDisplay')}
      >
        {selected && selected.length
          ? selected.map((option: Option) => {
              return (
                <ItemWithXToRemove
                  styles={classNames.getObj('ItemWithXToRemove')}
                  key={option.id}
                  onClick={() => handleRemoveItem(option)}
                >
                  {option.content}
                </ItemWithXToRemove>
              );
            })
          : 'Select an Option'}
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
                  key={option.id}
                  styles={classNames.getObj('DropdownItem')}
                  onClick={() => {
                    handleItemClick(option);
                  }}
                  isSelected={selected ? selected.includes(option) : false}
                >
                  {option.content}
                </DropdownItem>
              );
            })}
      </Dropdown>
    </Container>
  );
};
export default MultiSelect;
