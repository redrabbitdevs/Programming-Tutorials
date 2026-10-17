const date = Temporal.PlainDate.from("2026-03-14");
console.log(date.toString(), date.year, date.month, date.day);
console.log(date.dayOfWeek, date.daysInMonth, date.inLeapYear);

const later = date.add({ days: 20 });
console.log(later.toString(), date.toString());
console.log(date.with({ day: 1 }).toString());
const jan31 = Temporal.PlainDate.from("2026-01-31");
console.log(jan31.add({ months: 1 }).toString());

const built = new Temporal.PlainDate(2026, 12, 25);
console.log(built.toString(), Temporal.PlainDate.compare(date, built));
console.log(date.until(built).toString());
console.log(date.until(built, { largestUnit: "day" }).days);
console.log(date.equals(Temporal.PlainDate.from("2026-03-14")));
