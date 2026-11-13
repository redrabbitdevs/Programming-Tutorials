import source mathModule from "./math.wasm";

function instantiate(label) {
  const report = (total) => console.log(`${label} reported ${total}`);
  return new WebAssembly.Instance(mathModule, { env: { report } });
}

const a = instantiate("a");
const b = instantiate("b");
new Int32Array(a.exports.memory.buffer).set([1, 2, 3]);
new Int32Array(b.exports.memory.buffer).set([10, 20, 30]);

console.log("is a Module:", mathModule instanceof WebAssembly.Module);
a.exports.sum(0, 3);
b.exports.sum(0, 3);
console.log("same memory:", a.exports.memory === b.exports.memory);
