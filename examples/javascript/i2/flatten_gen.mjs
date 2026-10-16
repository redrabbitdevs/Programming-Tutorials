function* flatten(items) {
  for (const item of items) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

const nested = [1, [2, [3, 4]], 5, [[6]]];
console.log([...flatten(nested)]);

for (const value of flatten(nested)) {
  if (value > 2) {
    console.log("first above 2:", value);
    break;
  }
}
