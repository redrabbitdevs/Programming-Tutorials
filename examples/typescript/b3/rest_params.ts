function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));
console.log(sum(...[4, 5]));
console.log(sum());
