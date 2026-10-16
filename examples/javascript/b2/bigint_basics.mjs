const big = 2n ** 64n;
console.log(big);
console.log(typeof big);
console.log(5n / 2n, 7n % 3n);
console.log(BigInt(Number.MAX_SAFE_INTEGER) + 2n);
console.log(10n > 5, 10n == 10, 10n === 10);
console.log(1n + BigInt(1), Number(1n) + 1);
