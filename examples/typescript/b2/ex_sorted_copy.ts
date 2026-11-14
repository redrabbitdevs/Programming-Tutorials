function sortedCopy(items: readonly number[]): number[] {
  return [...items].sort((a, b) => a - b);
}

const original: readonly number[] = [3, 1, 2];
console.log(sortedCopy(original), original);
