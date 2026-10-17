function daysBetween(from, to) {
  const ms = Date.parse(to) - Date.parse(from);
  return Math.round(ms / (24 * 60 * 60 * 1000));
}

console.log(daysBetween("2026-03-01", "2026-03-31"));
console.log(daysBetween("2026-01-01", "2027-01-01"));
console.log(daysBetween("2026-03-10", "2026-03-01"));
console.log(daysBetween("2028-02-28", "2028-03-01"));
