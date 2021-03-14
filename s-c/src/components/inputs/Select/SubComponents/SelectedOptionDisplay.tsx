import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import { twParse } from '../../../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../../../lib/typeHelpers';
import useClassNameManager from '../../../../lib/useClassNameManager';
import ScrollArea from 'react-scrollbar';

const DefaultCss = {
    main: twParse`
    w-full
    elevation-1
    cursor-pointer
    flex-nowrap
    h-8
    bg-white
    p-2
    s-flex-row
    space-x-3
    overflow-y-hidden
    scrollbar-thin
    scrollbar-thumb-gray-500
    scrollbar-track-orange-200
    `

};

export type SelectedOptionDisplayStyles = {
    main: StyleOverride
}

interface SelectedOptionDisplayProps extends ReusableComponentBase{
    styles?: SelectedOptionDisplayStyles
    onClick: any,
}
const SelectedOptionDisplay: React.FunctionComponent<SelectedOptionDisplayProps> =({
    styles, children, onClick
})=> {
    const classNames = useClassNameManager(styles,DefaultCss);

  

    //console.log('got these classnames for selectedOptionDisplay',classNames.getString('main'))
return (
        <div  className={classNames.getString('main')} onClick={onClick}>
            {children}
        </div> 

);
}




export default SelectedOptionDisplay;
