function add(a, b) {
  return a + b;
}

function tier(f) {
  if (%ActiveTierIsTurbofan(f)) return "TurboFan";
  if (%ActiveTierIsMaglev(f)) return "Maglev";
  if (%ActiveTierIsSparkplug(f)) return "Sparkplug";
  if (%ActiveTierIsIgnition(f)) return "Ignition";
  return "not compiled yet";
}

let last = tier(add);
const seen = [last];
for (let i = 1; i <= 2_000_000; i++) {
  add(i, 1);
  const now = tier(add);
  if (now !== last) { seen.push(now + "@" + i); last = now; }
}
console.log(seen.join(" -> "));
