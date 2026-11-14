const stock = new Map<string, number>();
stock.set("apple", 5);
stock.set("pear", 0);

const apples: number | undefined = stock.get("apple");
console.log(apples, stock.get("plum"), stock.has("pear"), stock.size);

for (const [item, count] of stock) {
  console.log(item, count);
}
