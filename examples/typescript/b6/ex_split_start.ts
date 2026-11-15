const grades: number[] = [70, 85, 90];

function average(list: number[]): number {
  const sum = list.reduce((total, n) => total + n, 0);
  return sum / list.length;
}

function report(name: string, value: number): string {
  return `${name}: ${value.toFixed(1)}`;
}

console.log(report("Ada", average(grades)));
