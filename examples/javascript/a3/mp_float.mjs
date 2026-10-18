let total = 0;
for (let i = 0; i < 10; i++) total += 0.1;
console.log(total, total === 1);

console.log(1e20 + 1 - 1e20, 1e20 - 1e20 + 1);

console.log((1.005).toFixed(2), (1.005).toPrecision(20));
