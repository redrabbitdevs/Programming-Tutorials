process.env.TZ = "America/New_York";

const show = (d) => d.toString().slice(0, 33);
const eve = new Date(2026, 2, 7, 12, 0);
console.log(show(eve));

const plus24h = new Date(eve.getTime() + 24 * 60 * 60 * 1000);
console.log(show(plus24h));

const nextDay = new Date(eve);
nextDay.setDate(nextDay.getDate() + 1);
console.log(show(nextDay));

console.log((nextDay - eve) / 3600000);
