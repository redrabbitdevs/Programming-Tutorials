const bytes = new TextEncoder().encode("a€😀");

// A continuation byte looks like 10xxxxxx. Every other byte starts a character.
const starts = bytes.filter((byte) => (byte & 0b11000000) !== 0b10000000);
console.log(bytes.length, starts.length);
