function first(input: string): string;
function first(input: number[]): number;
function first(input: string | number[]): string | number {
  return typeof input === "string" ? input.charAt(0) : input[0];
}

const letter = first("hello");
const number = first([10, 20]);
console.log(letter.toUpperCase(), number + 1);
