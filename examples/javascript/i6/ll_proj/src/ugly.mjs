export const   items=['a',"b",   'c'];
export function show( list ){
    for(const item of list){console.log( item )}
  return list.length
}
export const config = {name:'demo',retries:3,verbose:false,
  tags:["one","two","three","four","five","six"]}
