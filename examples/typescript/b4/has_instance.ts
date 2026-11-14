const StringArray = {
  [Symbol.hasInstance](value: unknown): value is string[] {
    return Array.isArray(value) && value.every((x) => typeof x === "string");
  },
};

function joinAll(value: unknown): string {
  if (value instanceof StringArray) {
    return value.join("+");
  }
  return "not a list of strings";
}

console.log(joinAll(["a", "b"]), joinAll([1, 2]));
