const prices = [4, 15, 8, 23];

const doubled = prices.map((p) => p * 2);
const cheap = prices.filter((p) => p < 10);
const total = prices.reduce((sum, p) => sum + p, 0);

console.log(doubled);
console.log(cheap);
console.log(total);

const result = prices
  .filter((p) => p > 5)
  .map((p) => p * 1.1)
  .reduce((sum, p) => sum + p, 0);
console.log(result.toFixed(2));
