const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const { year, month, day } = "on 2026-03-14".match(re).groups;
console.log(year, month, day);

console.log("2026-03-14".replace(re, "$<day>.$<month>.$<year>"));

const short = (...args) => {
  const groups = args.at(-1);
  return `${groups.day}/${groups.month}`;
};
console.log("2026-03-14".replace(re, short));

const quoted = /(?<q>["'])(.*?)\k<q>/;
console.log(quoted.exec(`say "hi" and 'bye'`)[0]);
