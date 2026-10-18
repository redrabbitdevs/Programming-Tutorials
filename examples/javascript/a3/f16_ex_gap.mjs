function nextUp(x) {
  const view = new DataView(new ArrayBuffer(2));
  view.setFloat16(0, x);
  view.setUint16(0, view.getUint16(0) + 1);
  return view.getFloat16(0);
}

for (const x of [1, 1000, 60000]) {
  console.log(x, nextUp(x) - x);
}
