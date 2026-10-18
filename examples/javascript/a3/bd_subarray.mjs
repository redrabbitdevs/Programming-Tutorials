const data = Uint8Array.of(10, 20, 30, 40, 50);
const view = data.subarray(1, 3);
const copy = data.slice(1, 3);

view[0] = 99;
copy[1] = 77;
console.log(data);
console.log(view, view.byteOffset);
console.log(copy, copy.byteOffset);
