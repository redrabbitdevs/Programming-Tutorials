function readOnly(object) {
  const refuse = (target, key) => {
    throw new TypeError(`read-only: ${String(key)}`);
  };
  return new Proxy(object, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      return typeof value === "object" && value !== null
        ? readOnly(value)
        : value;
    },
    set: refuse,
    deleteProperty: refuse,
    defineProperty: refuse,
  });
}

const config = { port: 80, db: { host: "x" } };
const view = readOnly(config);
console.log(view.port, view.db.host);

const attempts = [
  () => { view.port = 81; },
  () => { view.db.host = "y"; },
  () => { delete view.port; },
];
for (const attempt of attempts) {
  try {
    attempt();
  } catch (error) {
    console.log(error.message);
  }
}
config.port = 8080;
console.log(view.port);
