import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import Dropdown from './SubComponents/Dropdown';
import DropdownItem from './SubComponents/DropdownItem';
import ItemWithXToRemove from './SubComponents/ItemWithXToRemove';
import { MultiSelectProps, Option } from './index';
import SelectedOptionDisplay from './SubComponents/SelectedOptionDisplay';
import Container from './SubComponents/StyledSelectContainer';
import {twParse}from '../../../lib/functionHelpers';
import useClassNameManager from '../../../lib/useClassNameManager';

const DefaultTw = {
  SelectedOptionDisplay: {
    content: twParse`
    overflow-x-scroll
    overflow-y-hidden
    scrollbar-thin
    scrollbar-thumb-gray-500
    flex
    flex-row
    items-center
    justify-between
    flex-nowrap
    space-x-3
    `
  }
};


const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
  placeholder
}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const classNames = useClassNameManager(styles,DefaultTw);
  const scrollAreaRef = useRef(null);
  //whenever displayDropdown changes, update the injected styles
  useEffect(()=>{
    if (displayDropdown) {
      classNames.inject('SelectedOptionDisplay.main',twParse`rounded-b-none`);
      return;
    }

    classNames.removeInjection('SelectedOptionDisplay.main',twParse`rounded-b-none`);
  },[displayDropdown]);

  //whenever the content overflows the container
  useEffect(()=>{
    if (!scrollAreaRef?.current) {return;}
    else {
      //@ts-ignore
    const isXOverflowing = scrollAreaRef.current.scrollWidth > scrollAreaRef.current.clientWidth;
    const invisibleScrollbar = twParse`scrollbar-track-transparent`;
    const visibleScrollbar = twParse`scrollbar-track-orange-200`;
    if (isXOverflowing){
      classNames.switchInjection('SelectedOptionDisplay.main',visibleScrollbar,invisibleScrollbar);
    } else {
      classNames.switchInjection('SelectedOptionDisplay.main',invisibleScrollbar, visibleScrollbar);
    }
    }
  },[scrollAreaRef]);

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
        scrollAreaRef={scrollAreaRef}
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={classNames.getObj('SelectedOptionDisplay')}
      >
        {selected && selected.length
          ? selected.map((option: Option) => {
              return (
                <ItemWithXToRemove
                  styles={classNames.getObj('ItemWithXToRemove')}
                  key={option.id}
                  onClick={(e: React.MouseEvent) => {e.stopPropagation();handleRemoveItem(option);}}
                >
                  {option.content}
                </ItemWithXToRemove>
              );
            })
          : placeholder || 'Select an Option'}
      </SelectedOptionDisplay>
      <Dropdown
        display={displayDropdown}
        styles={classNames.getObj('DropdownContainer')}
      >
        {children
          ? children
          : options? options.map((option: Option) => {
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
            }): <></>}
      </Dropdown>
    </Container>
  );
};
export default MultiSelect;
