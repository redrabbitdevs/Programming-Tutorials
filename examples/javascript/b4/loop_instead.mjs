function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

function sumToRecursive(n) {
  return n === 0 ? 0 : n + sumToRecursive(n - 1);
}

console.log(sumTo(1_000_000));
console.log(sumToRecursive(1000));
try {
  console.log(sumToRecursive(1_000_000));
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
