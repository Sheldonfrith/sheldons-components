import React, {
  useEffect,
  useState,
 
} from 'react';
import { twParse } from '../../lib/functionHelpers';
import { ReusableComponentBase} from '../../lib/typeHelpers';
import useClassNameManager from '../../lib/useClassNameManager';
import Button from '../inputs/Button';
import Select, { Option } from '../inputs/Select';
import Card from '../visuals/Card';
import _ from 'lodash';

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
    id?: string|number|null
   name?: string|null
}

export interface EditFormProps extends ReusableComponentBase{
    object: object,
    setObject: (newObject: object)=>void,
}

interface ObjectCrudProps extends ReusableComponentBase {
    title: string
    EditForm: React.FunctionComponent<EditFormProps>
    editFormProps?: unknown
    savedObjects?: CrudableObject[]
    setSavedObjects: React.Dispatch<React.SetStateAction<any>>
    apiSaveCallback?: (objToSave: object) => void
    apiDeleteCallback?: (objToDelete: object)=>void 
    editingObject?: CrudableObject
    setEditingObject?: React.Dispatch<React.SetStateAction<any>>
}

const ObjectCrud: React.FunctionComponent<ObjectCrudProps> = ({
 
  styles,
  title,
  EditForm,
  editFormProps,
  savedObjects,
  setSavedObjects,
  apiDeleteCallback,
  apiSaveCallback,
  editingObject,
  setEditingObject
}) => {
    console.log('savedObjects in object crud = ',savedObjects);
    const [selectedObject, setSelectedObject] = useState<CrudableObject|undefined>();
    const [loadedObject ,setLoadedObject] = useState<CrudableObject|undefined>();

    //keep loaded object and editing object in sync
    useEffect(()=>{
      if (!editingObject) return;
      if (_.isEqual(editingObject, loadedObject)) return;
      setSelectedObject(editingObject);
      setLoadedObject(editingObject);
    },[editingObject]);

    useEffect(()=>{
      if (!loadedObject) return;
      if (_.isEqual(editingObject, loadedObject)) return;
      setEditingObject?setEditingObject(loadedObject):null;
    },[loadedObject, setEditingObject]);

    function savedObjectsToOptions(): Option[]|undefined{
      if (!savedObjects || savedObjects.length < 1) 
        return undefined;
      const savedOptions = savedObjects.map(savedObject=>{
            return crudableObjectToOption(savedObject);
        });
        return savedOptions?.filter((item: Option | undefined) => item) as Option[];
    }
    function crudableObjectToOption(obj: CrudableObject | undefined): Option | undefined{
        if (!obj || obj.id ===null || obj.id === undefined ) return undefined;
        return {id: obj.id, value: obj.id, content: obj.name};
    }
    function getSavedObjectFromOption(option: Option | undefined){
        if (!savedObjects || !option) return undefined;
        return savedObjects.find(savedObject => savedObject.id === option.id);
    }
    function handleSaveClick(){
         if (!loadedObject) return;
         apiSaveCallback?apiSaveCallback(loadedObject):null;
          setSavedObjects((prev: CrudableObject[]|undefined) => {
            if (!prev) return [loadedObject];
            const clone = [...prev];
            const existingObj  = clone.findIndex(obj=>obj.id == loadedObject.id);
            if (existingObj) clone[existingObj] = loadedObject;
            else clone.push(loadedObject);
            return clone;
        });
    }
    function handleDeleteClick(){
      if (!loadedObject) return;
      apiDeleteCallback?apiDeleteCallback(loadedObject):null;
      setSavedObjects((prev: CrudableObject[]|undefined)=>{
        if (!prev) return [loadedObject];
        const clone = [...prev];
        const existingObj = clone.findIndex(obj=>obj.id === loadedObject.id);
        if (!existingObj) return clone;
        else clone.splice(existingObj,1);
        return clone;
      });
    }
    function handleLoadClick(){
      if (!selectedObject) return;
      setLoadedObject(selectedObject);
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
      <Button onClick={handleLoadClick}>Load</Button>
      <Button onClick={handleSaveClick}>Save</Button>
      <Button onClick={handleDeleteClick}>Delete</Button>
      </div>
      {loadedObject?
      <EditForm object={loadedObject} setObject={setLoadedObject} {...editFormProps}/>
      :<></>}
</Card>
  );
};
export default ObjectCrud;
