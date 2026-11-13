const target = new Uint8Array(8);
const { read, written } = target.setFromBase64("aGVsbG8gd29ybGQ=");
console.log(read, written);
console.log(new TextDecoder().decode(target.subarray(0, written)));

function base64Decoder() {
  let pending = "";
  return (text, last = false) => {
    pending += text;
    const out = new Uint8Array(Math.ceil(pending.length / 4) * 3);
    const { read, written } = out.setFromBase64(pending, {
      lastChunkHandling: last ? "loose" : "stop-before-partial",
    });
    pending = pending.slice(read);
    return out.subarray(0, written);
  };
}

const decode = base64Decoder();
const pieces = ["aGVsb", "G8gd2", "9ybGQ="];
pieces.forEach((piece, i) => {
  const bytes = decode(piece, i === pieces.length - 1);
  console.log(JSON.stringify(new TextDecoder().decode(bytes)));
});
