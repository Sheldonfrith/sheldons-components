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
import { StyleOverride } from '../../../lib/StyleCustomizer';
import { BaseStylesProp } from '../../../lib/typeHelpers';

const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  //whenever displayDropdown changes, update the injected styles
  useEffect(()=>{
    if (!displayDropdown) removeClassNameFromConditionalClassNames(/rounded-b-none/, 'selectedOptionDisplay');
    else addClassNameToConditionalClassNames('rounded-b-none', 'selectedOptionDisplay');
  },[displayDropdown]);


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
      styles={styles ? { container: styles?.container } : undefined}
    >
      <SelectedOptionDisplay
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={getStylesWithInjections<SelectedOptionDisplayStyles>('selectedOptionDisplay','container')}
      >
        {selected && selected.length
          ? selected.map((option: Option) => {
              return (
                <ItemWithXToRemove
                  styles={
                    styles
                      ? {
                          container: styles?.itemWithXToRemove,
                          icon: styles?.itemWithXToRemoveIcon,
                        }
                      : undefined
                  }
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
        styles={styles ? { container: styles?.dropdownContainer } : undefined}
      >
        {children
          ? children
          : options.map((option: Option) => {
              return (
                <DropdownItem
                  key={option.id}
                  styles={
                    styles ? { container: styles?.dropdownItem } : undefined
                  }
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
