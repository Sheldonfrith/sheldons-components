import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';


interface AppWrapperProps {}

const AppWrapper: React.FunctionComponent<AppWrapperProps> = ({children}) => {
  return (
      <>
        {children}
      </>
  );
};
export default AppWrapper;
