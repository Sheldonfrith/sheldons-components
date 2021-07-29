import React, {
  useState,
  useEffect,
 
} from 'react';



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
                //console.log('click detected on option ',id);
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
