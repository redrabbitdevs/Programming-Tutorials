function compensatedSum(values) {
  let sum = 0;
  let compensation = 0;
  for (const x of values) {
    const t = sum + x;
    if (Math.abs(sum) >= Math.abs(x)) compensation += sum - t + x;
    else compensation += x - t + sum;
    sum = t;
  }
  return sum + compensation;
}

const naive = (values) => values.reduce((a, b) => a + b, 0);
const tenths = Array(10).fill(0.1);

console.log(naive(tenths), compensatedSum(tenths));
console.log(naive([1e20, 0.1, -1e20]), compensatedSum([1e20, 0.1, -1e20]));
console.log(compensatedSum([0.1, 0.2]));
