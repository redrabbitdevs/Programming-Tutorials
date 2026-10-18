const original = new Uint8Array([1, 2, 3, 4]);
const moved = original.buffer.transfer();
console.log(original.buffer.detached, original.length);
console.log(new Uint8Array(moved));

const longer = moved.transfer(6);
console.log(moved.detached, new Uint8Array(longer));
