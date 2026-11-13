// A lookup table that is slow to build: the primes below five million.
// Run directly, the table is built again on every start.
const { startupSnapshot } = require("node:v8");

function buildPrimes(limit) {
  const sieve = new Uint8Array(limit);
  const primes = [];
  for (let n = 2; n < limit; n++) {
    if (sieve[n]) continue;
    primes.push(n);
    for (let m = n * n; m < limit; m += n) sieve[m] = 1;
  }
  return primes;
}

function main(primes) {
  const k = Number(process.argv.at(-1)) || 1;
  console.log(`prime number ${k} is ${primes[k - 1]}`);
}

const primes = buildPrimes(5_000_000);
if (startupSnapshot.isBuildingSnapshot()) {
  // Building: keep the table in the snapshot and run main on each start.
  startupSnapshot.setDeserializeMainFunction(() => main(primes));
} else {
  main(primes);
}
