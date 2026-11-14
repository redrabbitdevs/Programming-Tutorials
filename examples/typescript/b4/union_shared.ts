function firstTwo(value: string | number[]): string | number[] {
  return value.slice(0, 2);
}

function label(value: string | number): string {
  return value.toString();
}

console.log(firstTwo("hello"), firstTwo([1, 2, 3]));
console.log(label(4.5), label("x"));
