const duration = { hours: 1, minutes: 30, seconds: 5 };

for (const style of ["long", "short", "narrow", "digital"]) {
  const format = new Intl.DurationFormat("en", { style });
  console.log(style.padEnd(7), format.format(duration));
}

const french = new Intl.DurationFormat("fr", { style: "long" });
console.log(french.format({ days: 2, hours: 3 }));
