const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const units = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

function fromNow(seconds) {
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size || unit === "second") {
      return rtf.format(Math.round(seconds / size), unit);
    }
  }
}

for (const s of [-45, 7200, -259200, 86400]) {
  console.log(fromNow(s));
}
