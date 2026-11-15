export function average(list: number[]): number {
  const sum = list.reduce((total, n) => total + n, 0);
  return sum / list.length;
}
