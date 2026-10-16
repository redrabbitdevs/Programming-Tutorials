const nothing = null;
const list = [1, 2];
const record = { a: 1 };

console.log(typeof nothing === "object", nothing === null);
console.log(typeof list === "object", Array.isArray(list));
console.log(typeof record === "object", Array.isArray(record));
