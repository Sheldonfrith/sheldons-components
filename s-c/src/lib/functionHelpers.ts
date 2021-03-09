
// Credit: John from Stack Overflow
// Implementation of Traverse
function* traverse(o:any, path:string[]=[]): any {
    for (var i in Object.keys(o)) {//using object.keys to avoid hidden prototype/parent properties that I dont care about
        const subObj = o[i];
        const itemPath = path.concat(i);
        yield [i,subObj,itemPath,o];
        if (subObj !== null && typeof(subObj)=="object") {
            //going one step down in the object tree!!
            yield* traverse(o[i], itemPath);
        }
    }
}

export function traverseObject(o: object, callback: (key:string|number, value:any, path: string[],parent: object)=>void){
    for(var [key, value, path, parent] of traverse(o)) {
        callback(key,value,path,parent);
    }
}

export function twParse(strings: TemplateStringsArray, ...otherParams: any){
    const str = strings[0];
    return str.split(/\s/);
}