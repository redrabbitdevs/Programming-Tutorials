function getPath(object, path) {
  let value = object;
  for (const key of path.split(".")) {
    if (value === null || typeof value !== "object") return undefined;
    if (!Object.hasOwn(value, key)) return undefined;
    value = value[key];
  }
  return value;
}

const config = { db: { host: "localhost", port: 5432 } };
console.log(getPath(config, "db.host"), getPath(config, "db.user"));
console.log(getPath(config, "db.constructor"), getPath(config, "__proto__"));
