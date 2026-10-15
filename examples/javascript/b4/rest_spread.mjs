function sum(...numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}
console.log(sum(), sum(1), sum(1, 2, 3));

function log(level, ...messages) {
  console.log(`[${level}]`, messages.join(" "));
}
log("info", "server", "started", "on", 8080);

const scores = [72, 91, 85];
console.log(Math.max(...scores), Math.min(...scores));
console.log(sum(...scores, 10));

const copy = [...scores, 100];
console.log(copy, scores);

const defaults = { theme: "light", size: 12 };
const settings = { ...defaults, size: 16 };
console.log(settings, defaults);
