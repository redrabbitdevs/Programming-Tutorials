function deepFreeze(value) {
  if (typeof value === "object" && value !== null) {
    for (const child of Object.values(value)) {
      deepFreeze(child);
    }
    Object.freeze(value);
  }
  return value;
}

const config = deepFreeze({ db: { host: "localhost", ports: [1, 2] } });

for (const change of [
  () => (config.db.host = "remote"),
  () => config.db.ports.push(3),
  () => delete config.db,
]) {
  try {
    change();
    console.log("changed");
  } catch (error) {
    console.log(error.name);
  }
}
console.log(config);
