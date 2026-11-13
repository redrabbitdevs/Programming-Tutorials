const weights = [0.12345, -1.5, 3.14159, 70000];
const wide = new Float64Array(weights);
const half = new Float16Array(weights);

console.log(wide.byteLength, half.byteLength);
console.log(half);
console.log(Array.from(half, (w) => w.toFixed(3)));
