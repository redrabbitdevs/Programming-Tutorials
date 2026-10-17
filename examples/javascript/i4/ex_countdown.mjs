function untilDate(from, to) {
  const a = Temporal.PlainDate.from(from);
  const b = Temporal.PlainDate.from(to);
  const span = a.until(b, { largestUnit: "month" });
  return `${span.months}m ${span.days}d`;
}

console.log(untilDate("2026-03-14", "2026-12-25"));
console.log(untilDate("2026-01-31", "2026-03-01"));
console.log(untilDate("2026-12-25", "2026-12-25"));
