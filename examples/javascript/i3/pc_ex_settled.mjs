const check = (name, ok) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (ok ? resolve(name) : reject(new Error(name))), 5);
  });

const results = await Promise.allSettled([
  check("db", true),
  check("cache", false),
  check("queue", true),
  check("mail", false),
]);

const up = results.filter((r) => r.status === "fulfilled");
const down = results.filter((r) => r.status === "rejected");
console.log(`${up.length} up:`, up.map((r) => r.value));
console.log(`${down.length} down:`, down.map((r) => r.reason.message));
