// Served next to math.wasm. The server must send it as application/wasm.
const imports = {
  env: { report: (total) => console.log("wasm reported", total) },
};
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("./math.wasm"),
  imports,
);

const out = document.querySelector("#out");
out.textContent = `add(2, 3) = ${instance.exports.add(2, 3)}`;
