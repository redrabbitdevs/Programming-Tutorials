function isPrime(n) {
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return n > 1;
}

function tier(f) {
  if (%ActiveTierIsTurbofan(f)) return "TurboFan";
  if (%ActiveTierIsMaglev(f)) return "Maglev";
  if (%ActiveTierIsSparkplug(f)) return "Sparkplug";
  return "Ignition";
}

let calls = 0;
for (const batch of [10, 100, 1000, 10_000, 100_000]) {
  while (calls < batch) isPrime(calls++);
  console.log(`after ${batch} calls: ${tier(isPrime)}`);
}
