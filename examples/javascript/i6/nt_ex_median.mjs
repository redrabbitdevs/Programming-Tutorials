export function median(numbers) {
  const sorted = numbers.sort();
  const middle = Math.floor(sorted.length / 2);
  return sorted[middle];
}
