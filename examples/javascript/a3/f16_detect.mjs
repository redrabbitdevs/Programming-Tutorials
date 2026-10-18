const Half = globalThis.Float16Array ?? Float32Array;
const store = new Half([0.1, 0.2]);
console.log(Half.name, store.BYTES_PER_ELEMENT);
