let total = 0;
const prices = [5, 10, 15];

for (const price of prices) {
  total += price;
}

const callbacks = [];
for (let n = 1; n <= 3; n++) {
  callbacks.push(() => `step ${n}`);
}

if (total > 20) {
  const message = "big order";
  console.log(message);
}

console.log(total, typeof price);
console.log(callbacks.map((cb) => cb()));
console.log(typeof message);
