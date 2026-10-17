function model(schema, initial) {
  return new Proxy({ ...initial }, {
    set(obj, key, value, receiver) {
      const check = schema[key];
      if (!check) {
        throw new TypeError(`unknown field "${String(key)}"`);
      }
      if (!check(value)) {
        throw new TypeError(`bad value for "${key}": ${value}`);
      }
      return Reflect.set(obj, key, value, receiver);
    },
  });
}

const user = model(
  { name: (v) => typeof v === "string", age: Number.isInteger },
  { name: "Ada", age: 36 },
);

user.age = 37;
console.log(user.name, user.age);

for (const [key, value] of [["age", 37.5], ["email", "a@b.c"]]) {
  try {
    user[key] = value;
  } catch (error) {
    console.log(error.message);
  }
}
