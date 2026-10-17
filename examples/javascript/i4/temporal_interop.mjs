const legacy = new Date("2026-03-14T15:30:00Z");
const instant = legacy.toTemporalInstant();
console.log(instant.toString());
console.log(new Date(instant.epochMilliseconds).toISOString());

const zoned = instant.toZonedDateTimeISO("Europe/Berlin");
const style = { dateStyle: "long", timeStyle: "short" };
console.log(zoned.toLocaleString("en-GB", style));
const full = { dateStyle: "full" };
console.log(zoned.toPlainDate().toLocaleString("de-DE", full));

const now = Temporal.Now.instant();
console.log(typeof now.epochMilliseconds, typeof Temporal.Now.timeZoneId());
console.log(Temporal.Now.plainDateISO("UTC") instanceof Temporal.PlainDate);

const d = Temporal.PlainDate.from("2026-03-14");
console.log(d.add({ days: 1 }) === d, d.toString());

const feb30 = { year: 2026, month: 2, day: 30 };
console.log(Temporal.PlainDate.from(feb30).toString());
try {
  Temporal.PlainDate.from(feb30, { overflow: "reject" });
} catch (error) {
  console.log(error.name);
}
try {
  Temporal.PlainDate.from("2026-02-30");
} catch (error) {
  console.log(error.name);
}
