function* countFrom(start) {
  let n = start;
  while (true) {
    yield n++;
  }
}

function isPrime(n) {
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) {
      return false;
    }
  }
  return n > 1;
}

const primes = countFrom(2).filter(isPrime).take(10).toArray();
console.log(primes.join(" "));
console.log(primes.values().reduce((sum, p) => sum + p, 0));
