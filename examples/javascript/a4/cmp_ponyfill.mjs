export function toHex(bytes) {
  if (typeof bytes.toHex === "function") return bytes.toHex();
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

console.log(toHex(Uint8Array.of(1, 171, 255)));
