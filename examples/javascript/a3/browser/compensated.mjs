// Neumaier compensated summation, the fallback used by mp_sum_precise.mjs.
export function compensatedSum(values) {
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
