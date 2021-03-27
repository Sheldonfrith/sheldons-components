import React, {
  useState,
  useEffect,
  
} from 'react';



interface NavContentProps{
    currentOption: string
}

const NavContent: React.FunctionComponent<NavContentProps> = ({
  children,
  currentOption,
}) => {
    const [optionMap, setOptionMap] = useState<{[optionName: string]:JSX.Element}>()
useEffect(()=>{
    if (!children) return;
    const optionMap1: {[optionName: string]: JSX.Element} = {};
    React.Children.forEach(children, child =>{
        try {
            //@ts-ignore
            if (child && child.props.id) optionMap1[child.props.id] = child;
        } catch (error){
            console.warn('children of NavContent are invalid');
            return;
        }
        });
    setOptionMap(optionMap1);
},[children]);

  return optionMap?optionMap[currentOption]:<></>;
};
export default NavContent;
