function shout(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return String(value);
}

console.log(shout("hi"));
console.log(shout(42));
