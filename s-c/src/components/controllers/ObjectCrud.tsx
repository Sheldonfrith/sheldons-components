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
import Button from '../inputs/Button';
import Select, { Option } from '../inputs/Select';
import Card from '../visuals/Card';

const DefaultTw = {
  Card: {
      main: twParse`
        `,
  },
  actionsContainer: twParse`
    flex
    flex-row
    items-center
  `,
};

export interface CrudableObject {
    id: string|number
   name: string
}

export interface EditFormProps extends ReusableComponentBase{
    object: any,
    setObject: any,
}

interface ObjectCrudProps extends ReusableComponentBase {
    title: string
    EditForm: React.FunctionComponent<EditFormProps>
    editFormProps?: unknown
    savedObjects?: CrudableObject[]
    setSavedObjects: any
    apiSaveCallback?: any
    apiDeleteCallback?: any
}

const ObjectCrud: React.FunctionComponent<ObjectCrudProps> = ({
  children,
  styles,
  title,
  EditForm,
  editFormProps,
  savedObjects,
  setSavedObjects,
  apiDeleteCallback,
  apiSaveCallback,
}) => {
    const [selectedObject, setSelectedObject] = useState<CrudableObject|undefined>();
    const [loadedObject ,setLoadedObject] = useState<CrudableObject|undefined>();

    function savedObjectsToOptions(): Option[]|undefined{
        const savedOptions = savedObjects?.map(savedObject=>{
            return crudableObjectToOption(savedObject);
        });
        return savedOptions?.filter((item: Option | undefined) => item) as Option[];
    }
    function crudableObjectToOption(obj: CrudableObject | undefined): Option | undefined{
        if (!obj) return undefined;
        return {id: obj.id, value: obj.id, content: obj.name};
    }
    function getSavedObjectFromOption(option: Option | undefined){
        if (!savedObjects || !option) return undefined;
        return savedObjects.find(savedObject => savedObject.id === option.id);
    }
    function handleSaveClick(){
         if (!loadedObject) return;
         apiSaveCallback(loadedObject);
          setSavedObjects((prev: any[]) => {
            const clone = [...prev];
            const existingObj  = clone.findIndex(obj=>obj.id == loadedObject.id);
            if (existingObj) clone[existingObj] = loadedObject;
            else clone.push(loadedObject);
            return clone;
        });
    }
    function handleDeleteClick(){
      if (!loadedObject) return;
      apiDeleteCallback(loadedObject);
      setSavedObjects((prev: any[])=>{
        const clone = [...prev];
        const existingObj = clone.findIndex(obj=>obj.id === loadedObject.id);
        if (!existingObj) return clone;
        else clone.splice(existingObj,1);
        return clone;
      });
    }
  const classNames = useClassNameManager(styles, DefaultTw);
  return (
  <Card styles={classNames.getObj('Card')}>
      <h3>{title}</h3>
      <div className={classNames.getString('actionsContainer')}>
      <Select 
        type="styled" 
        options={savedObjectsToOptions()}
        selected={crudableObjectToOption(selectedObject)}
        onChange={(obj: Option | undefined)=>setSelectedObject(getSavedObjectFromOption(obj))}
        placeholder={`Select Existing`}
    >
      </Select>
      <Button onClick={()=>setLoadedObject(selectedObject)}>Load</Button>
      <Button onClick={handleSaveClick}>Save</Button>
      <Button onClick={handleDeleteClick}>Delete</Button>
      </div>
      <EditForm object={loadedObject} setObject={setLoadedObject} {...editFormProps}/>
</Card>
  );
};
export default ObjectCrud;
