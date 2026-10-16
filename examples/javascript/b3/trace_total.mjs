const prices = [3, 8, 5];
let total = 0;

for (const price of prices) {
  total += price;
  console.log("price:", price, "total:", total);
}

console.log({ total });
