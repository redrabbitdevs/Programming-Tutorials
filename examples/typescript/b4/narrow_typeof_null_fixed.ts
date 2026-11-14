function count(value: string[] | null): number {
  if (value !== null) {
    return value.length;
  }
  return 0;
}

console.log(count(["a", "b"]), count(null));
