function pick(n: number): number | undefined {
  if (n > 0) {
    return n;
  }
}
console.log(pick(1), pick(-1));
