const temps = [21.37, 21.41, 22.08, 19.96, 20.5, 23.14];
const stored = new Float16Array(temps);
const wide = new Float64Array(temps);

let maxError = 0;
stored.forEach((value, i) => {
  maxError = Math.max(maxError, Math.abs(value - temps[i]));
});

console.log(`bytes: ${stored.byteLength} instead of ${wide.byteLength}`);
console.log(`max error: ${maxError.toFixed(4)}`);
