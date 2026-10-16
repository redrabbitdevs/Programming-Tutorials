const lines = [
  "INFO start",
  "ERROR disk full",
  "INFO retry",
  "ERROR timeout",
  "ERROR crash",
  "INFO done",
];

let checked = 0;
const firstTwo = lines
  .values()
  .filter((line) => {
    checked += 1;
    return line.startsWith("ERROR");
  })
  .map((line) => line.slice(6))
  .take(2)
  .toArray();

console.log(firstTwo);
console.log(`checked ${checked} of ${lines.length} lines`);
