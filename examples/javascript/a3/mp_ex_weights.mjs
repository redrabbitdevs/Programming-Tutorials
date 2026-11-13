function allocateByWeight(totalCents, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const shares = weights.map((w) => Math.floor((totalCents * w) / totalWeight));
  const rests = weights.map((w) => (totalCents * w) % totalWeight);

  let left = totalCents - shares.reduce((a, b) => a + b, 0);
  const order = weights.map((_, i) => i).toSorted((a, b) => rests[b] - rests[a]);
  for (const i of order) {
    if (left === 0) break;
    shares[i] += 1;
    left -= 1;
  }
  return shares;
}

for (const [total, weights] of [[10000, [1, 1, 1]], [1000, [50, 30, 20, 7]]]) {
  const shares = allocateByWeight(total, weights);
  console.log(shares, shares.reduce((a, b) => a + b, 0));
}
