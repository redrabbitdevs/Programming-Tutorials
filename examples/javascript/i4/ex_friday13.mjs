const found = [];
for (let month = 0; month < 12; month++) {
  const day = new Date(Date.UTC(2026, month, 13));
  if (day.getUTCDay() === 5) {
    found.push(day.toISOString().slice(0, 10));
  }
}
console.log(found);
