const bytes = new TextEncoder().encode("héllo");
const encoded = bytes.toBase64();
console.log(bytes.length, encoded);

const decoded = Uint8Array.fromBase64(encoded);
console.log(new TextDecoder().decode(decoded));
console.log(Uint8Array.fromBase64("aMOp\nbGxv").length);
