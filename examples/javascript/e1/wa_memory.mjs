import { readFile } from "node:fs/promises";

const bytes = await readFile(new URL("./math.wasm", import.meta.url));
const { instance } = await WebAssembly.instantiate(bytes, {
  env: { report: () => {} },
});
const { memory, sum } = instance.exports;

console.log("memory bytes:", memory.buffer.byteLength);
const numbers = new Int32Array(memory.buffer, 0, 5);
numbers.set([10, 20, 30, 40, 50]);
console.log("sum of 5 numbers:", sum(0, 5));

numbers[4] = 1000;
console.log("after a JS write:", sum(0, 5));
