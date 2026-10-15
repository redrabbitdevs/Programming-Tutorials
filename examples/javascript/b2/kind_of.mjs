function kindOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

console.log(kindOf(null));
console.log(kindOf([1, 2]));
console.log(kindOf({ a: 1 }));
console.log(kindOf("hi"));
console.log(kindOf(undefined));
