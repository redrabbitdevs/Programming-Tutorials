process.env.TZ = "America/New_York";

const DAY = 24 * 60 * 60 * 1000;
const addDaysBuggy = (d, n) => new Date(d.getTime() + n * DAY);

function addDays(d, n) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

const start = new Date(2026, 2, 7, 12, 0);
console.log("buggy", addDaysBuggy(start, 2).getHours());
console.log("fixed", addDays(start, 2).getHours());
console.log("start", start.getHours());
