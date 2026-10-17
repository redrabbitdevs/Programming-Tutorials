const jan31 = new Date(Date.UTC(2026, 0, 31));
const next = new Date(jan31);
next.setUTCMonth(next.getUTCMonth() + 1);
console.log(jan31.toISOString().slice(0, 10), next.toISOString().slice(0, 10));

const lastDay = new Date(Date.UTC(2026, 2, 0));
console.log(lastDay.getUTCDate());

const start = new Date(Date.UTC(2026, 0, 1));
const later = new Date(start);
later.setUTCDate(later.getUTCDate() + 45);
console.log(later.toISOString().slice(0, 10));

const DAY = 24 * 60 * 60 * 1000;
const a = Date.UTC(2026, 0, 1);
const b = Date.UTC(2026, 11, 25);
console.log((b - a) / DAY);

console.log(new Date(2026, 0, 1) < new Date(2026, 0, 2));
console.log(new Date(0) == new Date(0), +new Date(0) === +new Date(0));
