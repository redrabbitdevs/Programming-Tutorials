function average(numbers) {
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  debugger; // pauses here only when a debugger is attached
  return sum / numbers.length;
}

console.log(average([2, 4, 9]));
