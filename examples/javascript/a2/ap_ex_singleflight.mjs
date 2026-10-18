const inFlight = new Map();

function singleFlight(key, fn) {
  if (inFlight.has(key)) return inFlight.get(key);
  const promise = fn().finally(() => inFlight.delete(key));
  inFlight.set(key, promise);
  return promise;
}

const settle = () => new Promise((resolve) => setImmediate(resolve));
let calls = 0;
async function loadUser(id) {
  calls++;
  await settle();
  return { id, name: `user${id}` };
}

const load = (id) => singleFlight(`user:${id}`, () => loadUser(id));
const users = await Promise.all([1, 1, 2, 1].map(load));
console.log(users.map((user) => user.name).join(" "), "- calls:", calls);
const later = await load(1);
console.log(later.name, "- calls:", calls);
