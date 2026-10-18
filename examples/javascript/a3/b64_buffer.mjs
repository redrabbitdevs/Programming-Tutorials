const buf = Buffer.from("héllo");
console.log(buf.toString("base64"), buf.toString("hex"));
console.log(Buffer.from("aMOpbGxv", "base64").toString());

console.log(Buffer.from("ab@@cd", "base64"));
console.log(Buffer.from("abc", "hex"));
