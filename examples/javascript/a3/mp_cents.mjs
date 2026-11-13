function toCents(text) {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(text);
  if (!match) throw new SyntaxError(`not an amount: ${text}`);
  const [, sign, whole, fraction = ""] = match;
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return sign ? -cents : cents;
}

function formatCents(cents) {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const fraction = String(abs % 100).padStart(2, "0");
  return `${sign}${Math.trunc(abs / 100)}.${fraction}`;
}

function allocate(totalCents, parts) {
  const base = Math.floor(totalCents / parts);
  const remainder = totalCents - base * parts;
  return Array.from({ length: parts }, (_, i) =>
    i < remainder ? base + 1 : base,
  );
}

const prices = ["0.10", "0.20", "19.99"].map(toCents);
const sum = prices.reduce((a, b) => a + b, 0);
console.log(prices, formatCents(sum));
console.log(allocate(toCents("1.00"), 3).map(formatCents));
