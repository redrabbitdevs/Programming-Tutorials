const n = 1234567.891;
for (const locale of ["en-US", "de-DE", "fr-FR", "en-IN"]) {
  console.log(locale, new Intl.NumberFormat(locale).format(n));
}

function money(locale, currency, amount) {
  const style = "currency";
  return new Intl.NumberFormat(locale, { style, currency }).format(amount);
}
console.log(money("en-US", "USD", 1234.5));
console.log(money("de-DE", "EUR", 1234.5));
console.log(money("ja-JP", "JPY", 1234.5));

const pct = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});
console.log(pct.format(0.256), pct.format(1.5));

const fixed = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 });
console.log(fixed.format(3), fixed.format(2.5), fixed.format(1 / 3));

const compact = new Intl.NumberFormat("en-US", { notation: "compact" });
console.log(compact.format(1500), compact.format(2300000));

const speed = { style: "unit", unit: "kilometer-per-hour" };
console.log(new Intl.NumberFormat("en-US", speed).format(88));
