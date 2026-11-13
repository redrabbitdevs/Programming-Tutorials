export function createRateLimiter({ limit, windowMs, now = Date.now }) {
  const windows = new Map();
  return function allow(key) {
    const time = now();
    let entry = windows.get(key);
    if (!entry || time - entry.start >= windowMs) {
      entry = { start: time, count: 0 };
      windows.set(key, entry);
    }
    entry.count++;
    return entry.count <= limit;
  };
}

let clock = 0;
const allow = createRateLimiter({ limit: 3, windowMs: 60_000, now: () => clock });

const ip = "1.2.3.4";
console.log([1, 2, 3, 4].map(() => allow(ip)).join(" "));
console.log(allow("5.6.7.8"));
clock += 60_000;
console.log(allow(ip));
