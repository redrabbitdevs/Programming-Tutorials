function bits(x) {
  const view = new DataView(new ArrayBuffer(2));
  view.setFloat16(0, x);
  const b = view.getUint16(0).toString(2).padStart(16, "0");
  return `${b[0]} ${b.slice(1, 6)} ${b.slice(6)}`;
}

for (const x of [1, -2, 0.5, 65504, Infinity]) {
  console.log(String(x).padStart(8), bits(x));
}
