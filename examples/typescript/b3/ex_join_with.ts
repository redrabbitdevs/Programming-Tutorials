function joinWith(separator: string, ...parts: string[]): string {
  return parts.join(separator);
}

console.log(joinWith(", ", "a", "b", "c"));
console.log(joinWith("-"));
