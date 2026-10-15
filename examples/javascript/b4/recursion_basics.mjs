function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
console.log(factorial(5), factorial(10));

function countdown(n) {
  if (n === 0) {
    console.log("liftoff");
    return;
  }
  console.log(n);
  countdown(n - 1);
}
countdown(3);

function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
console.log(power(2, 10));
