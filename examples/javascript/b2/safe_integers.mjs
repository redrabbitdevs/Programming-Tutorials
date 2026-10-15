const big = Number.MAX_SAFE_INTEGER;

console.log(big);
console.log(big + 1);
console.log(big + 2);
console.log(big + 1 === big + 2);
console.log(Number.isSafeInteger(big), Number.isSafeInteger(big + 1));
console.log(Number.isInteger(5.0), Number.isInteger(5.5));
