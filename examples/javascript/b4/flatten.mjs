function flatten(value) {
  if (!Array.isArray(value)) {
    return [value];
  }
  const result = [];
  for (const item of value) {
    result.push(...flatten(item));
  }
  return result;
}

console.log(flatten([1, [2, [3, [4]]], 5]));
console.log(flatten([]));
console.log(flatten(["a", [["b"], "c"]]));
