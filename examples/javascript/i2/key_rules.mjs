const keys = {
  object: {},
  array: [],
  function: () => {},
  number: 1,
  string: "text",
  null: null,
  symbol: Symbol("local"),
  registered: Symbol.for("shared"),
};

for (const [label, key] of Object.entries(keys)) {
  try {
    new WeakMap().set(key, true);
    console.log(label, "ok");
  } catch (error) {
    console.log(label, error.name);
  }
}
