const data = new TextEncoder().encode("hello");
const digest = await crypto.subtle.digest("SHA-256", data);
console.log(new Uint8Array(digest).toHex());

console.log(Uint8Array.fromHex("FF8800"));
try {
  Uint8Array.fromHex("abc");
} catch (error) {
  console.log(error.name);
}
