function average(...numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total / numbers.length;
}

function clamp(value, { min = 0, max = 100 } = {}) {
  return Math.min(Math.max(value, min), max);
}

console.log(average(), average(4), average(2, 4, 9));
console.log(average(...[10, 20, 30, 40]));
console.log(clamp(150), clamp(-5), clamp(42));
console.log(clamp(7, { min: 10 }), clamp(7, { max: 5 }));
