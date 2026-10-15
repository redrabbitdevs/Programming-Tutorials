const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

console.log(factorial(5));
console.log(factorial.name);
console.log(typeof fact);
