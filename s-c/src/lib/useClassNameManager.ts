import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  BaseStylesProp,
  StyleDefaults,
  StyleOverride,
  TwClasses,
} from './typeHelpers';
import _ from 'lodash';
import { traverseObject } from './functionHelpers';
import { twCascade } from '@mariusmarais/tailwind-cascade';

export default function useClassNameManager(
  stylesProp?: BaseStylesProp,
  defaults?: StyleDefaults
) {
  //console.log('running hook (rerender) with defaults ', defaults);
  const [internalOverrides, setInternalOverrides] = useState<BaseStylesProp>({
    none: { partial: true },
  });
  const [calculatedStyles, setCalculatedStyles] = useState<BaseStylesProp>({
    none: { partial: true },
  }); //! do not use setCalculatedStyles outside of the manager class

  //un props or defaults or overrides change... combine the props with defaults and overrides to get calclulated styles
  useEffect(() => {
    // console.log('change in styles prop, defaults, or internal overrides');
    const initCalculator = new StylePropsCalculator(
      stylesProp || { none: { partial: true } },
      defaults || { none: [''] }
    );
    const propsPlusDefaults = initCalculator.get();
    const combiner = new StyleOverrideCombiner();
    const plusOverrides = combiner.combineStyles(
      propsPlusDefaults,
      internalOverrides
    );
    // console.log(
    //   'before and after internal overrides applied: ',
    //   propsPlusDefaults,
    //   plusOverrides
    // );
    setCalculatedStyles(plusOverrides);
  }, [stylesProp, defaults, internalOverrides, setCalculatedStyles]);

  //on calculatedStyles change
  useEffect(() => {
    // console.log('calculated styles has changed', calculatedStyles);
  }, [calculatedStyles]);

  const getCName = useCallback(
    (path: string) => {
    //   console.log('getting fresh className for ', path);
      if (!calculatedStyles) return twCascade(_.get(defaults, path)); //always return defaults if no props or overrides
      const componentStyles: object = _.get(calculatedStyles, path);
      //console.log('getting string classname for ', path, targetObject);
      if (!componentStyles) return twCascade(_.get(defaults,path));
      const isStyleOverrideObj = Object.keys(componentStyles).includes('partial');
      if (!isStyleOverrideObj)
        throw new Error(
          'invalid object given to getClassName in ClassNamesManager'
        );
      const nameCalculator = new ClassNameCalculator(
        componentStyles as StyleOverride
      );
      return nameCalculator.getString();
    },
    [calculatedStyles, defaults]
  );
  const getObj = useCallback(
    (path: string): any => {
      //console.log('geting obj, ',path);
      const target = _.get(calculatedStyles, path);
      if (!target) return undefined;
      const isStyleOverrideObj = Object.keys(target).includes('partial');
      if (isStyleOverrideObj)
        throw new Error(
          'cannot use "getObj" method to get the styles for node(html element), only use this method for getting styles prop for React component'
        );
      //console.log('successfully got object', target);
      return { ...target };
    },
    [calculatedStyles]
  );
  const partial = useCallback(
    (path: string, value: boolean): void => {
      setInternalOverrides(prev => {
        const n = { ...prev };
        _.set(n, `${path}.partial`, value);
        return n;
      });
    },
    [setInternalOverrides]
  );
  const addExclusion = useCallback(
    (path: string, regExToAdd: RegExp[]): void => {
      setInternalOverrides(prev => {
        const n = { ...prev };
        const existingObj = _.get(n, `${path}`);
        if (!existingObj || existingObj['partial'] === undefined)
          _.set(n, 'partial', true); //handle initialization of this path
        _.update(n, `${path}.tailwindRemovals`, function(classList: RegExp[]) {
          if (!classList) return [...regExToAdd];
          return [...classList, ...regExToAdd];
        });
        return n;
      });
    },
    [setInternalOverrides]
  );
  const removeExclusion = useCallback(
    (path: string, regExToRemove: RegExp[]) => {
      setInternalOverrides(prev => {
        const n = { ...prev };
        _.update(n, `${path}.tailwindRemovals`, function(classList: RegExp[]) {
          if (!classList) return classList;
          return [...classList.filter(item => !regExToRemove.includes(item))];
        });
        return n;
      });
    },
    [setInternalOverrides]
  );
  const addInsertion = useCallback(
    (path: string, classesToAdd: TwClasses): void => {
      setInternalOverrides(prev => {
        const n = { ...prev };
        const existingObj = _.get(n, `${path}`);
        if (!existingObj || existingObj['partial'] === undefined)
          _.set(n, `${path}.partial`, true); //handle initialization of this path
        _.update(n, `${path}.tailwind`, function(classList: TwClasses) {
        //   console.log('updating ', path, ' with ', classList, classesToAdd);
          if (!classList) return [...classesToAdd];
          return [...classList, ...classesToAdd];
        });
        return n;
      });
    },
    [setInternalOverrides]
  );
  
  const removeInsertion = useCallback(
    (path: string, classesToRemove: TwClasses) => {
      setInternalOverrides(prev => {
        const n = { ...prev };
        _.update(n, `${path}.tailwind`, function(classList: TwClasses) {
          if (!classList) return classList;
          return [...classList.filter(item => !classesToRemove.includes(item))];
        });
        return n;
      });
    },
    [setInternalOverrides]
  );
  const switchInsertion = useCallback((path: string, additions: TwClasses, removals: TwClasses)=>{
    removeInsertion(path, removals);
    addInsertion(path, additions);
  },[addInsertion, removeInsertion]);
  return {
    getString: getCName,
    getObj: getObj,
    partial: partial,
    inject: addInsertion,
    removeInjection: removeInsertion,
    switchInjection: switchInsertion,
    exclude: addExclusion,
    removeExclusion: removeExclusion,
  };
}

class StylePropsCalculator {
  private calculatedStyles;
  private initPropStyles;
  private initDefaultStyles;
  public constructor(
    initPropStyles: BaseStylesProp,
    initDefaultStyles: StyleDefaults
  ) {
    this.initPropStyles = initPropStyles;
    this.initDefaultStyles = initDefaultStyles;
    this.calculatedStyles = this.calculateStyles();
  }
  public get() {
    return this.calculatedStyles;
  }
  private calculateStyles(): BaseStylesProp {
    // //console.log('beginning to calc styles with', this.initDefaultStyles, this.initPropStyles)
    const defaultsObj = this.getObjectFromDefaults();
    // //console.log('got this default obj', defaultsObj);
    const combiner = new StyleOverrideCombiner();
    return combiner.combineStyles(defaultsObj, this.initPropStyles);
  }

  private getObjectFromDefaults(): BaseStylesProp {
    // //console.log('getting default object with ',this.initDefaultStyles);
    const defaultsMapped = {};
    traverseObject(
      this.initDefaultStyles,
      //@ts-expect-error
      (key: string | number, value: any, path: string[], parent: object) => {
        // //console.log('tranversing defaults', key, value, path);
        const isStringArray =
          Array.isArray(value) && value.length && typeof value[0] === 'string';
        const isTwClasses = isStringArray;
        if (!isTwClasses) return;
        // //console.log('tranversng for default create, IS TwClasses object', value, key, path);
        const newValue = this.convertTwClassesToStyleOverride(value);
        _.set(defaultsMapped, path, newValue);
      }
    );
    return defaultsMapped;
  }
  private convertTwClassesToStyleOverride(value: TwClasses) {
    return {
      partial: true,
      tailwind: value,
    };
  }
}

class StyleOverrideCombiner {
  public combineStyles(
    baseObj: BaseStylesProp,
    overrideObj: BaseStylesProp
  ): BaseStylesProp {
    // console.log('combining styles', baseObj, overrideObj);
    const newObj = { ...baseObj };
    traverseObject(
      overrideObj,
      //@ts-expect-error
      (key: string | number, value: any, path: string[], parent: object) => {
        if (!value) return;
        const theseKeys = Object.keys(value);
        const isStyleOverrideObj = theseKeys.includes('partial');
        if (!isStyleOverrideObj) return;
        this.overridePartial(newObj, path, value.partial);
        if (!value.partial) {
          //FULL OVERRIDE
          _.set(newObj, [...path, 'tailwind'], value.tailwind);
          _.set(newObj, [...path, 'tailwindRemovals'], value.tailwindRemovals);
        } else {
          this.applyAndClearRemovals(_.get(newObj, path));
          this.overrideTailwind(newObj, path, value.tailwind);
          this.setTailwindRemovals(newObj, path, value.tailwindRemovals);
        }
      }
    );
    return newObj;
  }
  private overridePartial(
    obj: BaseStylesProp,
    path: string[],
    newVal: boolean
  ): void {
    _.set(obj, [...path, 'partial'], newVal);
  }
  private applyAndClearRemovals(obj: StyleOverride): void {
    const rems = obj.tailwindRemovals;
    if (!rems || !rems.length) return;
    const adds = obj.tailwind;
    if (!adds || !adds.length) return;
    obj.tailwind = adds.filter(
      className => !rems.find(exp => className.match(exp))
    );
    obj.tailwindRemovals = undefined;
  }
  private overrideTailwind(
    obj: BaseStylesProp,
    path: string[],
    newVal: TwClasses | undefined
  ): void {
    if (!newVal || !newVal.length) return;
    const existingTw: TwClasses | undefined = _.get(obj, [...path, 'tailwind']);
    if (!existingTw || !existingTw.length) {
      _.set(obj, [...path, 'tailwind'], newVal);
      return;
    }
    const combinedLists = [...existingTw, ...newVal];
    const dedupedLists = combinedLists.filter(
      (item, index) => combinedLists.lastIndexOf(item) == index
    ); //Keep the last item to respect the list order, which is important (classnames coming later override those previous in the same categories);
    _.set(obj, [...path, 'tailwind'], dedupedLists);
  }
  private setTailwindRemovals(
    obj: BaseStylesProp,
    path: string[],
    newVal: RegExp[]
  ): void {
    if (!newVal || !newVal.length) return;
    _.set(obj, [...path, 'tailwindRemovals'], newVal);
  }
}

class ClassNameCalculator {
  private obj;
  public constructor(obj?: StyleOverride) {
    this.obj = obj;
  }
  public getString() {
    if (!this.obj) return '';
    // console.log('getting string in class name calculator with ', this.obj);
    //apply removals to classnames
    const classNamesList = this.obj.tailwindRemovals
      ? this.getFilteredClassNames()
      : this.obj.tailwind;
    //   console.log('about to give this list to twCascade:',classNamesList);
    //use twcascade to get the classname
    return twCascade(classNamesList);
  }
  private getFilteredClassNames() {
    if (!this.obj) return [];
    const rems = this.obj.tailwindRemovals;
    if (!rems || !rems.length) return this.obj.tailwind;
    const adds = this.obj.tailwind;
    if (!adds || !adds.length) return [];
    return adds.filter(className => !rems.find(exp => className.match(exp)));
  }
}
