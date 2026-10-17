const d = Temporal.Duration.from({ hours: 1, minutes: 30 });
console.log(d.toString(), d.total("minute"), d.minutes);
console.log(Temporal.Duration.from("P1Y2M3DT4H").months);

const long = Temporal.Duration.from({ minutes: 135 });
console.log(long.round({ largestUnit: "hour" }).toString());
console.log(long.add({ minutes: 30 }).toString());

const a = Temporal.PlainDate.from("2026-01-31");
const b = Temporal.PlainDate.from("2026-03-15");
console.log(a.until(b, { largestUnit: "month" }).toString());
console.log(a.until(b, { largestUnit: "week" }).toString());
console.log(a.since(b).toString());

const x = Temporal.Instant.from("2026-03-14T10:00:00Z");
const y = Temporal.Instant.from("2026-03-14T12:15:00Z");
console.log(x.until(y).toString(), x.until(y).total("minute"));
