import { readFile } from "node:fs/promises";

const bytes = await readFile(new URL("./text.wasm", import.meta.url));
const { instance } = await WebAssembly.instantiate(bytes);
const { memory, upper } = instance.exports;

function shout(text) {
  const view = new Uint8Array(memory.buffer);
  const { written } = new TextEncoder().encodeInto(text, view);
  upper(0, written);
  return new TextDecoder().decode(view.subarray(0, written));
}

console.log(shout("hello, wasm!"));
console.log(shout("crème brûlée"));
