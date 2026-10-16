const numbers = [2, 4, 9];
let sum = 0;

for (const n of numbers) {
  sum += n;
}

debugger; // pauses here only when a debugger is attached
console.log(sum / numbers.length);
