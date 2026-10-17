const moment = new Date("2026-03-14T15:30:00Z");

const base = { timeZone: "UTC", dateStyle: "long" };
console.log(new Intl.DateTimeFormat("en-US", base).format(moment));
console.log(new Intl.DateTimeFormat("en-GB", base).format(moment));
console.log(new Intl.DateTimeFormat("de-DE", base).format(moment));
console.log(new Intl.DateTimeFormat("ja-JP", base).format(moment));

const fields = {
  timeZone: "Asia/Tokyo",
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
};
console.log(new Intl.DateTimeFormat("en-GB", fields).format(moment));

const ny = { timeZone: "America/New_York", timeStyle: "short" };
console.log(moment.toLocaleTimeString("en-GB", { ...ny, hourCycle: "h23" }));
console.log(moment.toLocaleDateString("sv-SE", { timeZone: "UTC" }));
