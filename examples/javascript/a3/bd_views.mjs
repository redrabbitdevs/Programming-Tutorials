const buffer = new ArrayBuffer(8);
const bytes = new Uint8Array(buffer);
const words = new Uint16Array(buffer);

bytes[0] = 0x34;
bytes[1] = 0x12;
console.log(buffer.byteLength, bytes.length, words.length);
console.log(words[0].toString(16));

bytes[2] = 300;
bytes[3] = -1;
console.log(bytes[2], bytes[3]);

const clamped = new Uint8ClampedArray(2);
clamped[0] = 300;
clamped[1] = -1;
console.log(clamped[0], clamped[1]);
console.log(new Float32Array([0.1])[0]);
