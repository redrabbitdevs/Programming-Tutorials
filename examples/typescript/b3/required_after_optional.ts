function range(start?: number, end: number): number[] {
  return [start ?? 0, end];
}
console.log(range(1, 5));
