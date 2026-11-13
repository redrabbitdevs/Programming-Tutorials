const precisions = {
  f64: (x) => x,
  f32: Math.fround,
  f16: Math.f16round,
};

for (const [name, round] of Object.entries(precisions)) {
  const sum = round(round(0.1) + round(0.2));
  console.log(name, sum, sum === round(0.3));
}
