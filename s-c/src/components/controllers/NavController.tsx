import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';

const DefaultTw = {
  main: twParse``,
};

interface NavControllerProps {
    initialOption: string
    setCurrentOption: (option: string)=> void
}

const NavController: React.FunctionComponent<NavControllerProps> = ({
  children,
  initialOption,
  setCurrentOption
}) => {
    const [selectedOption, setSelectedOption] = useState(initialOption);

    useEffect(()=>{
        if (!selectedOption) return;
        setCurrentOption(selectedOption);
    },[selectedOption])

function getJSX(){
    try {
        if (!children) return <></>;
        //@ts-ignore
    return children.map(child=>{
            const id = child.props.id;
          return (
            <div key={id} onClick={()=>{
                console.log('click detected on option ',id);
                setSelectedOption(id)
            }}>
                {React.cloneElement(child,{isSelectedNavItem: (selectedOption === id)})}
            </div>
          );
      });
    } catch (error){
        //means children are invalid
        console.warn('children of NavController are invalid');
        return <></>;
    }
}

return getJSX();
}

export default NavController;
