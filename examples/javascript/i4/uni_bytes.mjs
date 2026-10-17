const encoder = new TextEncoder();
for (const s of ["a", "é", "€", "😀"]) {
  console.log(s, s.length, encoder.encode(s).length);
}

const bytes = encoder.encode("é");
console.log([...bytes]);
console.log(new TextDecoder().decode(bytes));
console.log(new TextDecoder().decode(Uint8Array.of(0xff, 0x41)));
