function toNumber(input: string | number): number {
  if (typeof input === "string") {
    return Number(input.trim());
  }
  return input * 1;
}

console.log(toNumber(" 12 "), toNumber(5));
