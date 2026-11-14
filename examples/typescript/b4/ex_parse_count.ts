function parseCount(input: string | number | undefined): number {
  if (input === undefined) {
    return 0;
  }
  if (typeof input === "string") {
    return Number(input);
  }
  return input;
}

console.log(parseCount("8"), parseCount(3), parseCount(undefined));
