function square(n: number): number {
  return n * n;
}

// @ts-expect-error: the point of this call is the wrong type
console.log(square("4"));
