export function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

export function countPrimes(from, to) {
  let count = 0;
  for (let n = from; n < to; n++) {
    if (isPrime(n)) count++;
  }
  return count;
}
