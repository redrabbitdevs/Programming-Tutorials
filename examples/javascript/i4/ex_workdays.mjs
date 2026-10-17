function addWorkdays(start, count) {
  let day = Temporal.PlainDate.from(start);
  let left = count;
  while (left > 0) {
    day = day.add({ days: 1 });
    if (day.dayOfWeek <= 5) {
      left -= 1;
    }
  }
  return day.toString();
}

console.log(addWorkdays("2026-03-13", 1));
console.log(addWorkdays("2026-03-13", 5));
console.log(addWorkdays("2026-03-14", 3));
