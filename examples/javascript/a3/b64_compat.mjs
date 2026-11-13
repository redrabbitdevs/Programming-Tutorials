function toBase64(bytes) {
  if (typeof bytes.toBase64 === "function") return bytes.toBase64();
  const { buffer, byteOffset, byteLength } = bytes;
  return Buffer.from(buffer, byteOffset, byteLength).toString("base64");
}

console.log(toBase64(new TextEncoder().encode("héllo")));
