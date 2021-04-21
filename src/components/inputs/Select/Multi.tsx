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
import { css, FlattenSimpleInterpolation } from 'styled-components';

// const DefaultTw = {
//   SelectedOptionDisplay: {
//     content: twParse`
//     overflow-x-scroll
//     overflow-y-hidden
//     scrollbar-thin
//     scrollbar-thumb-gray-500
//     flex
//     flex-row
//     items-center
//     justify-between
//     flex-nowrap
//     space-x-3
//     `
//   }
// };


const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({
  children,
  options,
  onChange,
  selected,
  styles,
  placeholder
}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const scrollAreaRef = useRef(null);
  const [selectedOptionDisplayStyleOverride, setSelectedOptionDisplayStyleOverride]= useState<FlattenSimpleInterpolation|undefined>();
  //whenever displayDropdown changes, update the injected styles
  useEffect(()=>{
    if (displayDropdown) {
      setSelectedOptionDisplayStyleOverride(css`border-bottom-right-radius: 0; border-bottom-left-radius: 0;`);
      return;
    }
    setSelectedOptionDisplayStyleOverride(undefined);
  },[displayDropdown]);

  //whenever the content overflows the container
  // useEffect(()=>{
  //   if (!scrollAreaRef?.current) {return;}
  //   else {
  //     //@ts-ignore
  //   const isXOverflowing = scrollAreaRef.current.scrollWidth > scrollAreaRef.current.clientWidth;
  //   const invisibleScrollbar = css``;
  //   twParse`scrollbar-track-transparent`;
  //   const visibleScrollbar = twParse`scrollbar-track-orange-200`;
  //   if (isXOverflowing){
  //     classNames.switchInjection('SelectedOptionDisplay.main',visibleScrollbar,invisibleScrollbar);
  //   } else {
  //     classNames.switchInjection('SelectedOptionDisplay.main',invisibleScrollbar, visibleScrollbar);
  //   }
  //   }
  // },[scrollAreaRef]);

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
      styles={styles?.Container}
    >
      <SelectedOptionDisplay
        scrollAreaRef={scrollAreaRef}
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={{...styles?.SelectedOptionDisplay, main: css`${styles?.SelectedOptionDisplay.main}${selectedOptionDisplayStyleOverride}`}}
      >
        {selected && selected.length
          ? selected.map((option: Option) => {
              return (
                <ItemWithXToRemove
                  styles={styles?.ItemWithXToRemove}
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
        styles={styles?.DropdownContainer}
      >
        {children
          ? children
          : options? options.map((option: Option) => {
              return (
                <DropdownItem
                  key={option.id}
                  styles={styles?.DropdownItem}
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
