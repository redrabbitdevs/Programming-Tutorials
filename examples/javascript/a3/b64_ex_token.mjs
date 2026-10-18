const url = { alphabet: "base64url", omitPadding: true };

function encodePart(object) {
  const bytes = new TextEncoder().encode(JSON.stringify(object));
  return bytes.toBase64(url);
}

function decodePart(text) {
  const bytes = Uint8Array.fromBase64(text, { alphabet: "base64url" });
  return JSON.parse(new TextDecoder().decode(bytes));
}

const token = [{ alg: "none" }, { sub: "ada", name: "Ada Lovelace" }]
  .map(encodePart)
  .join(".");
console.log(token);
console.log(decodePart(token.split(".")[1]));
