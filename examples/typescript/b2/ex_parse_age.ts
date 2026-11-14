function parseAge(input: unknown): number {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    return Number(input);
  }
  return 0;
}

console.log(parseAge(36));
console.log(parseAge("42"));
console.log(parseAge(null));
