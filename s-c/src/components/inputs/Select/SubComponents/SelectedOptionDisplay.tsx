import React, {useState, useEffect, useContext, useCallback, useRef, RefObject} from 'react';
import { twParse } from '../../../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../../../lib/typeHelpers';
import useClassNameManager from '../../../../lib/useClassNameManager';
import ScrollArea from 'react-scrollbar';

const DefaultCss = {
    main: twParse`
    w-14
    elevation-1
    h-8
    bg-white
    flex
    flex-row
    items-center
    justify-between
    flex-nowrap
    justify-between
    s-buttonlike
    `,
    downIcon: twParse`
    gg-chevron-down
    p-2
    `,
    content: twParse`
      w-14
      p-2
      h-8
      flex
      flex-row
      items-center
      justify-between
      flex-nowrap
      justify-center
    `

};

export type SelectedOptionDisplayStyles = {
    main: StyleOverride
    downIcon: StyleOverride
    content: StyleOverride
}

interface SelectedOptionDisplayProps extends ReusableComponentBase{
    styles?: SelectedOptionDisplayStyles
    onClick: any,
    scrollAreaRef?: RefObject<HTMLDivElement>
}
const SelectedOptionDisplay: React.FunctionComponent<SelectedOptionDisplayProps> =({
    styles, children, onClick, scrollAreaRef
})=> {
    const classNames = useClassNameManager(styles,DefaultCss);



    //console.log('got these classnames for selectedOptionDisplay',classNames.getString('main'))
return (

        <div className={classNames.getString('main')} onClick={onClick}>
            <div ref={scrollAreaRef} className={classNames.getString('content')}>
            {children}
            </div>
            <div className={classNames.getString('downIcon')}></div>
        </div>

);
}




export default SelectedOptionDisplay;
