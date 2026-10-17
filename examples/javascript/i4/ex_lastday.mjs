function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

console.log(daysInMonth(2026, 2), daysInMonth(2028, 2));
console.log(daysInMonth(2026, 12), daysInMonth(2026, 4));
