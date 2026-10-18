function toCents(text) {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(text);
  if (!match) throw new SyntaxError(`not an amount: ${text}`);
  const [, sign, whole, fraction = ""] = match;
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return sign ? -cents : cents;
}

function compensatedSum(values) {
  let sum = 0;
  let compensation = 0;
  for (const x of values) {
    const t = sum + x;
    if (Math.abs(sum) >= Math.abs(x)) compensation += sum - t + x;
    else compensation += x - t + sum;
    sum = t;
  }
  return sum + compensation;
}

const prices = ["1.10", "2.20", "3.30", "19.99"];
const floats = prices.map(parseFloat);

const floatSum = floats.reduce((a, b) => a + b, 0);
const cents = prices.map(toCents).reduce((a, b) => a + b, 0);

console.log(`float: ${floatSum}`);
console.log(`cents: ${Math.trunc(cents / 100)}.${String(cents % 100).padStart(2, "0")}`);
console.log(`compensated: ${compensatedSum(floats)}`);
