const SCALE = 10_000n;

function parse(text) {
  const [whole, fraction = ""] = text.split(".");
  return BigInt(whole) * SCALE + BigInt(fraction.padEnd(4, "0"));
}

function format(value) {
  const fraction = String(value % SCALE).padStart(4, "0");
  return `${value / SCALE}.${fraction}`;
}

function divideRounded(n, d) {
  const quotient = n / d;
  const twiceRest = (n % d) * 2n;
  if (twiceRest > d) return quotient + 1n;
  if (twiceRest === d && quotient % 2n === 1n) return quotient + 1n;
  return quotient;
}

const multiply = (a, b) => divideRounded(a * b, SCALE);

let fixed = parse("1000.0000");
let float = 1000;
for (let month = 0; month < 12; month++) {
  fixed = multiply(fixed, parse("1.0042"));
  float *= 1.0042;
}
console.log(`fixed: ${format(fixed)}`);
console.log(`float: ${float.toFixed(4)}`);
console.log(`float, full: ${float}`);
