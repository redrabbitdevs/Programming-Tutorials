function applyTwice(f: (n: number) => number, x: number): number {
  return f(f(x));
}

console.log(applyTwice((n) => `${n}!`, 2));
