const list = [1, 2];
const arrayProto = Object.getPrototypeOf(list);
const objectProto = Object.getPrototypeOf(arrayProto);

console.log(arrayProto === Array.prototype);
console.log(objectProto === Object.prototype);
console.log(Object.getPrototypeOf(objectProto));

console.log(Object.hasOwn(list, "map"), "map" in list);
console.log(Object.hasOwn(arrayProto, "map"));
console.log(Object.hasOwn(objectProto, "hasOwnProperty"));
