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

const testStyles = {
  Container: {
      main: css`
      position:relative;  
      font-size: var(--fs-4);
      padding: 0;
      height: var(--s-11);
      margin: var(--s-4);
      display: flex;
      border-radius: var(--light-rounding);
      flex-direction: row;
      align-items: center;
      justify-content:row;
      background: var(--c-white);
      width: fit-content;
      `
  },
  SelectedOptionDisplay: {
      main: css`
      box-shadow: var(--shadow1);
      height: var(--s-8);
      margin: 0;
      background: var(--c-backrgound-light);
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: var(--light-rounding);
      justify-content: space-between;
      flex-wrap: none;
      cursor: pointer;
      min-width: var(--s-18);
      `,
      downIcon: css`
      padding: 0;
      margin: 0;
      `,
      content: css`
      padding: var(--s-2);
      height: var(--s-8);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: none;
      `,
  },
  DropdownContainer: {
      main: css`
      position: absolute;
      border-radius: var(--light-rounding);
      top: 80%;
      right: 0;
      left: 0;
      z-index: 200;
      background: var(--c-white);
      box-shadow: var(--shadow1);
      padding-inline: var(--s-3);
      padding-block: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      max-height: var(--s-14);
      overflow: auto;
      `
  },
  DropdownItem: {
      main: css`
      cursor: pointer;
      border-radius: var(--light-rounding);
      :hover{
          background: var(--c-green);
          color: var(--c-white);
      }
      `
  },
  ItemWithXToRemove: {
      main: css``,
      textContainer: css``,
      icon: css``,
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
      styles={testStyles?testStyles.Container:styles?.Container}
    >
      <SelectedOptionDisplay
        scrollAreaRef={scrollAreaRef}
        onClick={() => setDisplayDropdown(prev => !prev)}
        styles={{...testStyles?testStyles.SelectedOptionDisplay:styles?.SelectedOptionDisplay, main: css`${styles?.SelectedOptionDisplay.main}${selectedOptionDisplayStyleOverride}`}}
      >
        {selected && selected.length
          ? selected.map((option: Option) => {
              return (
                <ItemWithXToRemove
                  styles={testStyles?testStyles.ItemWithXToRemove:styles?.ItemWithXToRemove}
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
        styles={testStyles?testStyles.DropdownContainer:styles?.DropdownContainer}
      >
        {children
          ? children
          : options? options.map((option: Option) => {
              return (
                <DropdownItem
                  key={option.id}
                  styles={testStyles?testStyles.DropdownItem:styles?.DropdownItem}
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
