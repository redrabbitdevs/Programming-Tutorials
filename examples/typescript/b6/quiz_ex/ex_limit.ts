function limitFrom(args: string[], fallback: number): number {
  const at = args.indexOf("--count");
  const value = at === -1 ? undefined : args[at + 1];
  if (value === undefined) {
    return fallback;
  }
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

console.log(limitFrom(["--count", "3"], 5));
console.log(limitFrom(["--count", "x"], 5));
console.log(limitFrom(["--count"], 5));
console.log(limitFrom([], 5));
