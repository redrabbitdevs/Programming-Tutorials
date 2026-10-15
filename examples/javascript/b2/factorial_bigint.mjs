function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5n));
console.log(factorial(25n));
console.log(factorial(25n).toString().length);
