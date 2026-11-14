const stock = new Map([["apple", 5]]);

function count(item: string): number {
  return stock.get(item) ?? 0;
}

const pear = stock.get("pear");
if (pear === undefined) {
  console.log("no pears");
}

console.log(count("apple"), count("pear"));
