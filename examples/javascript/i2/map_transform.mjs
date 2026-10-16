const stock = new Map([
  ["apple", 5],
  ["pear", 0],
  ["plum", 12],
  ["fig", 3],
]);

const inStock = new Map([...stock].filter(([, count]) => count > 0));
console.log(inStock);

const byCount = new Map([...stock].sort((a, b) => b[1] - a[1]));
console.log([...byCount.keys()]);

const doubled = new Map(stock.entries().map(([name, n]) => [name, n * 2]));
console.log(doubled.get("plum"));

const merged = new Map([...stock, ["apple", 99], ["kiwi", 1]]);
console.log(merged.get("apple"), merged.size);
