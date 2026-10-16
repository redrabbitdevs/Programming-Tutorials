const addTax = (price) => price * 1.2;
const total = addTax(100);

const half = (n) => n / 2;

const makePoint = (x, y) => ({ x, y });

console.log(total);
console.log(half(10));
console.log(makePoint(3, 4));
