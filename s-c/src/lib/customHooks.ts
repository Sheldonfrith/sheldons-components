import React  from "react";
import {BaseStylesProp} from './typeHelpers';
import {StyleOverride} from './StyleCustomizer';

export function useClassNames(){
    //incoming props
        //holds StyleOverride objects for each of the defined sub-components in this component
    
    //changing props within the component...
        //call classNames.add(Component,class(es)ToAdd);
        //or call classNames.remove(Component, class(es)ToRemove);
    
    //on each of the sub-components: className={classNames.get(Component)}

  const [conditionalClassNames, setConditionalClassNames] = useState<{[componentKey:string]:string[]}>({});
    return new ClassNamesManager();
}

class ClassNamesManager {
    private classesFromProps;
    private classesFromLocal;

    public constructor(stylesProp: BaseStylesProp){

    }
    public get(Comp: React.FunctionComponent){}
    public add(Comp: React.FunctionComponent, toAdd: string | string[]){}
    public remove(Comp: React.FunctionComponent){}
}

function classNames(component: React.FunctionComponent){
    const componentName = component.name;
    type ComponentProps = React.ComponentProps<typeof component>;
}

function removeClassNameFromConditionalClassNames(nameToRemove:string | RegExp, componentKey: string){
    const regExp = (typeof nameToRemove === 'string')?new RegExp(nameToRemove):nameToRemove;
    setConditionalClassNames(prev =>{
      const targetArr = prev[componentKey];
      if (!targetArr) return prev;
      const filteredArr = targetArr.filter((str:string)=>!str.match(regExp));
      const needsToChange = (filteredArr.length!==targetArr.length);
      if (!needsToChange) return prev;
      const newPrev = {...prev};
      newPrev[componentKey] = filteredArr;
      return newPrev;
    });
  }
  function addClassNameToConditionalClassNames(nameToAdd: string, componentKey: string){
    setConditionalClassNames(prev =>{
      const targetArr = prev[componentKey]||[];
      if (targetArr.find((str:string)=>str.match(new RegExp(nameToAdd)))) return prev;
      targetArr.push(nameToAdd);
      const newPrev = {...prev};
      newPrev[componentKey] = targetArr;
      return newPrev;
    });
  }
  function addToTailwindField(obj: StyleOverride, toAdd: string | string[]): StyleOverride{
    const returnObj: StyleOverride = {...obj};
    const toAddAsArr: string[] = Array.isArray(toAdd)?toAdd:[toAdd];
    if (obj.tailwind){
      if (Array.isArray(obj.tailwind)){
        returnObj.tailwind = [...obj.tailwind, ...toAddAsArr]
      } else {
        returnObj.tailwind = [obj.tailwind, ...toAddAsArr]
      }
    } else {
      returnObj['tailwind'] = toAdd;
    }
    return returnObj;
  }

  function passStyles<T extends BaseStylesProp>(newKey: string, val: StyleOverride, existingObj?: {[key:string]:StyleOverride}):T{
    const returnObj: {[key:string]:StyleOverride} = existingObj?{...existingObj}:{};
    returnObj[newKey] = val;
    return returnObj as T;
  }

  //'rounded-b-none'
  const getStylesWithInjections = useCallback(function<T extends BaseStylesProp>(oldComponentKey: keyof typeof styles, newComponentKey: string):T|undefined {
    const stylesToAdd = conditionalClassNames[oldComponentKey]||[];
    const externalStyles = styles?styles[oldComponentKey]:undefined;
    if (styles && externalStyles) {
        return passStyles<T>(newComponentKey,addToTailwindField(externalStyles, stylesToAdd));
    } else {
      return passStyles<T>(newComponentKey,{ partial: true, tailwind: stylesToAdd});
    }
  },[conditionalClassNames, styles]);

