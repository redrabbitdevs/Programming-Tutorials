// AES-GCM with Web Crypto: runs unchanged in Node and in browsers.
const key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);

async function encrypt(text) {
  // A fresh 12-byte IV for every message: never reuse one with a key.
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(text);
  const sealed = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, key, data);
  return { iv, sealed: new Uint8Array(sealed) };
}

async function decrypt({ iv, sealed }) {
  const data = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv }, key, sealed);
  return new TextDecoder().decode(data);
}

const message = await encrypt("meet at noon");
console.log("ciphertext + tag bytes:", message.sealed.length);
console.log(await decrypt(message));

message.sealed[0] ^= 1; // flip one bit
try {
  await decrypt(message);
} catch (error) {
  console.log("tampered:", error.name);
}
