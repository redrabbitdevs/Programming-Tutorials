function factorial(n: bigint): bigint {
  return n <= 1n ? 1n : n * factorial(n - 1n);
}

console.log(factorial(20n));
console.log(factorial(25n));
