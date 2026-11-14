function mapNumbers(values: number[], fn: (n: number) => number): number[] {
  const result: number[] = [];
  for (const value of values) {
    result.push(fn(value));
  }
  return result;
}

console.log(mapNumbers([1, 2, 3], (n) => n * n));
