function describe(value: unknown): string {
  if (typeof value === "string") {
    return `text of length ${value.length}`;
  }
  if (typeof value === "number") {
    return `number ${value.toFixed(1)}`;
  }
  return "something else";
}

console.log(describe("hello"));
console.log(describe(3));
console.log(describe(true));
