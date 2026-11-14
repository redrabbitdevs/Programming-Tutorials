const operation: (a: number, b: number) => number = (a, b) => a + b;

function applyTwice(f: (n: number) => number, x: number): number {
  return f(f(x));
}

console.log(operation(2, 3));
console.log(applyTwice((n) => n * 3, 2));
