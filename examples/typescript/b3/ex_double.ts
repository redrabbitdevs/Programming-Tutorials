function double(input: number): number;
function double(input: number[]): number[];
function double(input: number | number[]): number | number[] {
  return Array.isArray(input) ? input.map((n) => n * 2) : input * 2;
}

console.log(double(4), double([1, 2, 3]));
