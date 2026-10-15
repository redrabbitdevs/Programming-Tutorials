let n = 27;
let steps = 0;
while (n !== 1) {
  n = n % 2 === 0 ? n / 2 : 3 * n + 1;
  steps++;
}
console.log("steps:", steps);

let attempts = 0;
do {
  attempts++;
  console.log("attempt", attempts);
} while (attempts < 3);

let neverRuns = 0;
do {
  neverRuns++;
} while (false);
console.log(neverRuns);
