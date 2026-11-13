const SCALE = 10_000n; // four decimal places

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

function multiply(a, b) {
  return divideRounded(a * b, SCALE);
}

console.log(format(parse("0.1") + parse("0.2")));
console.log(format(multiply(parse("1.0005"), parse("0.5"))));
console.log(format(multiply(parse("1.0015"), parse("0.5"))));

const balance = parse("98765432109876.5432");
console.log(format(multiply(balance, parse("1.0125"))));
