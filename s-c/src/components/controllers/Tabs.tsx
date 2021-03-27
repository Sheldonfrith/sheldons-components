import React, {
  useState,
 
  ReactNode,
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase, StyleOverride } from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import NavController from './NavController';
import NavContent from './NavContent';
import Button from '../inputs/Button';


const DefaultTw = {
  tabController: twParse`
  flex
  flex-row
  items-center
  justify-between
  `,
  tabContent: twParse`
  flex
  flex-row
  items-center
  justify-between
  `,
};

type Tab= {
        id: string,
        navTabContent: ReactNode
        tabContent: ReactNode
    };
interface TabsProps extends ReusableComponentBase {
    tabs: Tab[]
    styles: {
        tabController: StyleOverride
        tabContent: StyleOverride
    }
}

const Tabs: React.FunctionComponent<TabsProps> = ({

  styles,
  tabs
}) => {
  const classNames = useClassNameManager(styles, DefaultTw);
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
      <>
      <div className={classNames.getString('tabController')}>
      <NavController initialOption={currentTab}  setCurrentOption={(option: string)=>setCurrentTab(option)}>
        {tabs.map(tab=>{
            return <Button key={tab.id} id={tab.id} onClick={(e:any)=>{}}>{tab.navTabContent}</Button>
        })}
      </NavController>
      </div>
      <NavContent currentOption={currentTab}>
        {tabs.map(tab=>{
            return <div id={tab.id} key={tab.id}>{tab.tabContent}</div>;
        })}
      </NavContent>
      </>
  );
};
export default Tabs;
