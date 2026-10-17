process.env.TZ = "America/New_York";

console.log(new Date("2026-03-14").toISOString());
console.log(new Date("2026-03-14T00:00").toISOString());
console.log(new Date("2026-03-14T00:00Z").toISOString());
console.log(new Date(2026, 2, 14).toISOString());

const bad = new Date("not a date");
console.log(bad.getTime(), String(bad));
console.log(Number.isNaN(bad.getTime()), bad instanceof Date);
try {
  bad.toISOString();
} catch (error) {
  console.log(error.name);
}
