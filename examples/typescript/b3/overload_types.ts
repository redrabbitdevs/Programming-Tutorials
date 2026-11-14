function parse(input: string): number;
function parse(input: string[]): number[];
function parse(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}

const one: string = parse("42");
const many: string = parse(["1", "2"]);
console.log(one, many);
