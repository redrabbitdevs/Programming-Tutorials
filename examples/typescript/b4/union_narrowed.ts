function show(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

console.log(show(1.5), show("done"));
