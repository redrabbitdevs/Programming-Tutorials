const wanted = new Set(["a", "b", "c"]);
const stockLevels = new Map([["b", 4], ["c", 0], ["z", 9]]);

console.log(wanted.intersection(stockLevels));
console.log(wanted.difference(stockLevels));

try {
  wanted.union(["x"]);
} catch (error) {
  console.log(error.name);
}
console.log(wanted.union(new Set(["x"])).size);
