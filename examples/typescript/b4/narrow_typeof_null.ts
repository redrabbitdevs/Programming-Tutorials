function count(value: string[] | null): number {
  if (typeof value === "object") {
    return value.length;
  }
  return 0;
}

try {
  console.log(count(["a", "b"]), count(null));
} catch (error) {
  console.log(String(error));
}
