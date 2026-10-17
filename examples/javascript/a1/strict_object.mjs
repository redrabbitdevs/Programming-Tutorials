function strict(object) {
  return new Proxy(object, {
    get(target, key, receiver) {
      const probe = typeof key === "symbol" || key === "toJSON";
      if (!probe && !Reflect.has(target, key)) {
        throw new ReferenceError(`no property "${key}"`);
      }
      return Reflect.get(target, key, receiver);
    },
  });
}

const db = strict({ host: "localhost", port: 5432 });
console.log(db.host, db.port);
try {
  console.log(db.prot);
} catch (error) {
  console.log(error.name, error.message);
}
console.log(JSON.stringify(db));
