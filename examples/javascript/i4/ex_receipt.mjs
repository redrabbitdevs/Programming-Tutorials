const items = [
  { name: "tea", qty: 2, price: 3.5 },
  { name: "cake", qty: 1, price: 4.25 },
];
const sale = new Date("2026-03-14T15:30:00Z");

function receipt(locale, currency, timeZone) {
  const money = new Intl.NumberFormat(locale, { style: "currency", currency });
  const day = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone });
  const lines = [locale, day.format(sale)];
  let total = 0;
  for (const { name, qty, price } of items) {
    lines.push(`${qty} x ${name}: ${money.format(qty * price)}`);
    total += qty * price;
  }
  lines.push(`Total: ${money.format(total)}`);
  return lines.join("\n");
}

console.log(receipt("en-US", "USD", "America/New_York"));
console.log(receipt("de-DE", "EUR", "Europe/Berlin"));
console.log(receipt("ja-JP", "JPY", "Asia/Tokyo"));
