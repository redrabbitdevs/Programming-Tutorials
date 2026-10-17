const start = Temporal.ZonedDateTime.from("2026-03-07T12:00[America/New_York]");

const tomorrow = start.add({ days: 1 });
const in24h = start.add({ hours: 24 });
console.log(tomorrow.toPlainTime().toString(), in24h.toPlainTime().toString());

const gap = Temporal.ZonedDateTime.from("2026-03-08T02:30[America/New_York]");
console.log(gap.toString());
