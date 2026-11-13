import { readFile } from "node:fs/promises";

const bytes = await readFile(new URL("./text.wasm", import.meta.url));
const { instance } = await WebAssembly.instantiate(bytes);
const { memory, grow } = instance.exports;

const view = new Uint8Array(memory.buffer);
view[0] = 42;
console.log("pages before:", grow(1));
console.log("old view length:", view.length);
console.log("old buffer detached:", view.buffer.detached);

const fresh = new Uint8Array(memory.buffer);
console.log("new buffer bytes:", fresh.length);
console.log("data kept:", fresh[0]);
