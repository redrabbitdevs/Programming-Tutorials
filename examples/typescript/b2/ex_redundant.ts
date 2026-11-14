const greeting = "Hello";
const count = 3;
const ratio = 0.5;
const ready = true;

function label(name: string, n: number): string {
  return `${name} x${n}`;
}

const result = label(greeting, count);
console.log(result, ratio, ready);
