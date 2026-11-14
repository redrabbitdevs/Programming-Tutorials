function format(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return value.trim();
}

console.log(format(new Date("2026-03-05T12:00:00Z")));
console.log(format("  plain text  "));
