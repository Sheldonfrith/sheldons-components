
// // Credit: John from Stack Overflow
// // Implementation of Traverse
// function* traverse(o:any, path:string[]=[]): any {
//     for (var i in Object.keys(o)) {//using object.keys to avoid hidden prototype/parent properties that I dont care about
//         const subObj = o[i];
//         const itemPath = path.concat(i);
//         yield [i,subObj,itemPath,o];
//         if (subObj !== null && typeof(subObj)=="object") {
//             //going one step down in the object tree!!
//             yield* traverse(o[i], itemPath);
//         }
//     }
// }

type TravCallback = (key: string, value: any, path: string[], parent: object)=>void

function myTraverse(o: any,  callback: TravCallback, path: string[]=[],){
    Object.keys(o).forEach((key:string)=>{
        const val = o[key];
        const newPath = path.concat(key);
        callback(key,val, newPath, o);
        if (val !== null && typeof(val)=="object"){
            myTraverse(val,callback, newPath);
        }
    })
}

export function traverseObject(o: object, callback: (key:string|number, value:any, path: string[],parent: object)=>void){
    myTraverse(o,callback);
}
//@ts-expect-error
export function twParse(strings: TemplateStringsArray, ...otherParams: any){
    if (!strings?.length) return [];
    const str = strings[0];
    return str.split(/\s/).filter(item => item);
}