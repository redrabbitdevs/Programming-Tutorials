const bytes = Uint8Array.of(0xfb, 0xff, 0xbf, 0x01);
console.log(bytes.toBase64());
console.log(bytes.toBase64({ alphabet: "base64url" }));
console.log(bytes.toBase64({ alphabet: "base64url", omitPadding: true }));
