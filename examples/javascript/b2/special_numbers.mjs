console.log(1 / 0);
console.log(-1 / 0);
console.log(0 / 0);
console.log(Number("abc"));
console.log(NaN === NaN);
console.log(Number.isNaN(NaN), Number.isNaN("abc"));
console.log(isNaN("abc"));
console.log(Number.isFinite(1 / 0), Number.isFinite(42));

const negativeZero = 0 * -1;
console.log(negativeZero, negativeZero === 0, Object.is(negativeZero, 0));
console.log(String(negativeZero));
