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
