function size(value: string | unknown[]): number {
  return value.length;
}

console.log(size("hello"), size([1, 2, 3]));
