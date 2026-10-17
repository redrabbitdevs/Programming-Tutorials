const time = Temporal.PlainTime.from("15:30");
console.log(time.add({ minutes: 45 }).toString());

const dt = Temporal.PlainDateTime.from("2026-03-14T23:30:00");
console.log(dt.add({ hours: 1 }).toString());
console.log(dt.toPlainDate().toString(), dt.toPlainTime().toString());

const instant = Temporal.Instant.from("2026-03-14T15:30:00Z");
console.log(instant.epochMilliseconds, instant.toString());
console.log(instant.add({ hours: 2 }).toString());
console.log(instant.toZonedDateTimeISO("Asia/Tokyo").toString());

const yearMonth = Temporal.PlainYearMonth.from("2026-02");
console.log(yearMonth.daysInMonth, yearMonth.add({ months: 1 }).toString());
