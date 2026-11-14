const prices = new Map([
  ["tea", 2.5],
  ["coffee", 3],
]);

function total(items: string[]): number {
  let sum = 0;
  for (const item of items) {
    const price = prices.get(item);
    if (price === undefined) {
      throw new Error(`No price for ${item}`);
    }
    sum += price;
  }
  return sum;
}

console.log(total(["tea", "coffee"]));
try {
  total(["tea", "juice"]);
} catch (error) {
  console.log(String(error));
}
