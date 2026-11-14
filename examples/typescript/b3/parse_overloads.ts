function parse(input: string): number;
function parse(input: string[]): number[];
function parse(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}

const one = parse("42");
const many = parse(["1", "2", "3"]);
console.log(one + 1, many);
