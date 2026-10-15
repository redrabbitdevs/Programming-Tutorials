console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(1.1 + 2.2);
console.log(1 / 3);

const close = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;
console.log(close);

console.log((0.1 + 0.2).toFixed(2));
console.log(Number((0.1 + 0.2).toFixed(2)) === 0.3);
