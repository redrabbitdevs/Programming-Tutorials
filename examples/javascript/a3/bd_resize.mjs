const buffer = new ArrayBuffer(4, { maxByteLength: 16 });
const tracking = new Uint8Array(buffer);
const fixed = new Uint8Array(buffer, 0, 4);
console.log(buffer.resizable, buffer.maxByteLength);

buffer.resize(8);
console.log(tracking.length, fixed.length);
buffer.resize(2);
console.log(tracking.length, fixed.length);

try {
  buffer.resize(32);
} catch (error) {
  console.log(error.name);
}
