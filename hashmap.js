const uuid = require('uuid');
const _ = require('lodash');

const {performance} = require('perf_hooks');
  

class HashMap {
  hashMap;
  hashMapLength;
  constructor(length, initialInserts){
    this.hashMapLength = length;
    this.hashMap = [];
    if (initialInserts){
      this.insert(initialInserts);
    }
  }

  insert(inserts){
    Object.keys(inserts).forEach(key =>{
      const nKey = this.hash(key);
      this.hashMap[nKey] = this.insertToHashMapList(key, inserts[key],this.hashMap[nKey]);
    });
  }
  
  remove(keys){
    keys.forEach(key => {
      const entry  = this.hashMap[this.hash(key)];
      const existingIndex = entry.findIndex(item => item[0]===key);
      if (existingIndex >=0) {entry.splice(existingIndex,1)}
    });
  }
  
  find(key){
    const hashKey = this.hash(key);
    const list = this.hashMap[hashKey];
    const val = list.find(item => item[0] ===key);
    if (!val) throw new Error('Could not find the specified key in the hashMap');
    return val[1];
  }
  insertToHashMapList(key, val, list = []){
    const existingIndex = list.findIndex((item) => item[0]===key);
    if (existingIndex >= 0){
      list[existingIndex][1] = val;
    } else {
      list.push([key, val]);
    }
    return list;
  }
  hash(key){
    return this.hashKey(key, this.hashMapLength);
  }
  hashCode(input){
    var hash = 0;
    if (input.length == 0) return hash;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  hashKey(key, hashMapLength){
    return this.hashCode(key) % hashMapLength;
  }

}
 
  //create a very large object
  const testObj = {};
  for(let i = 0; i< 10000; i++){
    testObj[uuid.v4()] = Math.random();
  }

  function getRandomKey(){
    const keys = Object.keys(testObj);
    return keys[Math.floor(Math.random() * (keys.length -1))];
  }

  function randomLookupKeys(length){
    const returnList = [];
    for (let i =0; i < length; i++){
      returnList.push(getRandomKey());
    }
    return returnList;
  }

  const testKeys = randomLookupKeys(2000);

  const startHashMap = performance.now();
  const hashMap = new HashMap(10000,testObj);
  const endHashMapCreation = performance.now();
  const hMResults = testKeys.map(key=> hashMap.find(key));
  const endHashMap = performance.now();

  const startRegularLookup = performance.now();
  const objResults = testKeys.map(key=> testObj[key]);
  const endRegularLookup = performance.now();

  console.log('Test completed.');
  console.log('Both results sets are equal? ', _.isEqual(hMResults, objResults));
  console.log('total time hashMap = ', endHashMap - startHashMap);
  console.log('lookup time hash map = ',endHashMap - endHashMapCreation);
  console.log('total time regular = ', endRegularLookup - startRegularLookup);



