const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const prices = { apple: 3, pear: 5, plum: 4 };
let total = 0;

Object.keys(prices).forEach(async (name) => {
  await sleep(5);
  total += prices[name];
});

console.log("total:", total);
