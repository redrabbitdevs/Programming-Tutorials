function checksum(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return hash;
}

const input = "performance ".repeat(20);
let sink = 0;

function batch(calls) {
  const start = performance.now();
  for (let i = 0; i < calls; i++) sink ^= checksum(input);
  return (performance.now() - start) / calls;
}

const first = batch(200);
for (let i = 0; i < 20; i++) batch(2000);
const later = batch(2000);
console.log("later calls at least 3x faster:", later * 3 < first);
console.log("sink used:", typeof sink === "number");
