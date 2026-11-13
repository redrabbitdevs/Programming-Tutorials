// Counts how often a 10 ms timer manages to run while `work` runs.
export async function heartbeatsDuring(work) {
  let beats = 0;
  const timer = setInterval(() => beats++, 10);
  const result = await work();
  clearInterval(timer);
  return { beats, result };
}

// CPU-bound work: count the primes below `limit` by trial division.
export function isPrime(n) {
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return n > 1;
}
