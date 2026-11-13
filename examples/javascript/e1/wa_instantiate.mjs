import { readFile } from "node:fs/promises";

const bytes = await readFile(new URL("./math.wasm", import.meta.url));
const imports = {
  env: { report: (total) => console.log("wasm reported", total) },
};
const { module, instance } = await WebAssembly.instantiate(bytes, imports);

console.log("exports:", WebAssembly.Module.exports(module));
console.log("imports:", WebAssembly.Module.imports(module));
console.log("add(2, 3) =", instance.exports.add(2, 3));
console.log("add(2.9, '3') =", instance.exports.add(2.9, "3"));
console.log("add(2 ** 31, 0) =", instance.exports.add(2 ** 31, 0));
