for (const x of [0.1, 1 / 3, 1000.3, 2049]) {
  const f32 = Math.fround(x);
  const f16 = Math.f16round(x);
  console.log(`${x} | ${f32} | ${f16}`);
}
