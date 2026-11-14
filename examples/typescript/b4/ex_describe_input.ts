function describeInput(input: string | number | boolean): string {
  if (typeof input === "string") {
    return `text of length ${input.length}`;
  }
  if (typeof input === "number") {
    return `number ${input.toFixed(1)}`;
  }
  return input ? "yes" : "no";
}

console.log(describeInput("hello"));
console.log(describeInput(3));
console.log(describeInput(false));
