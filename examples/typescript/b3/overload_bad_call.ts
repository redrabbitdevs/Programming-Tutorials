function parse(input: string): number;
function parse(input: string[]): number[];
function parse(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}

function parseEither(value: string | string[]) {
  return parse(value);
}

console.log(parseEither("7"));
console.log(parse(42));
