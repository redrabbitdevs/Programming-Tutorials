function square(n: number): number {
  return n * n;
}

// @ts-expect-error: this call is fine, so the comment is wrong
console.log(square(4));
