function minMax(values: number[]): [min: number, max: number] {
  return [Math.min(...values), Math.max(...values)];
}

const [min, max] = minMax([4, 9, 1, 7]);
console.log(min, max);
