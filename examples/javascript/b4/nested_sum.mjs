function nestedSum(value) {
  if (typeof value === "number") {
    return value;
  }
  let total = 0;
  for (const item of value) {
    total += nestedSum(item);
  }
  return total;
}

console.log(nestedSum([1, [2, [3, 4]], 5]));
console.log(nestedSum([]));
console.log(nestedSum([[[[10]]]]));
