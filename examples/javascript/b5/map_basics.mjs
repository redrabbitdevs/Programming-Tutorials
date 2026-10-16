const stock = new Map([
  ["apple", 5],
  ["pear", 0],
]);

stock.set("plum", 12);
stock.set("apple", 7);
console.log(stock);
console.log(
  stock.get("apple"),
  stock.get("kiwi"),
  stock.has("pear"),
  stock.size,
);

stock.delete("pear");
console.log([...stock.keys()], [...stock.values()]);

for (const [fruit, count] of stock) {
  console.log(fruit, count);
}

const byObject = new Map();
const keyA = { id: 1 };
byObject.set(keyA, "first");
byObject.set(1, "number").set("1", "string");
console.log(byObject.get(keyA), byObject.get({ id: 1 }));
console.log(byObject.get(1), byObject.get("1"));

console.log(new Map(Object.entries({ a: 1 })));
console.log(Object.fromEntries(new Map([["b", 2]])));
