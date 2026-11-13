function hexdump(bytes) {
  const lines = [];
  for (let offset = 0; offset < bytes.length; offset += 16) {
    const row = bytes.subarray(offset, offset + 16);
    const hex = [...row].map((b) => b.toString(16).padStart(2, "0"));
    const text = [...row]
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
      .join("");
    const position = offset.toString(16).padStart(8, "0");
    lines.push(`${position}  ${hex.join(" ").padEnd(47)}  |${text}|`);
  }
  return lines.join("\n");
}

const bytes = new TextEncoder().encode("Typed arrays share memory.\n");
console.log(hexdump(bytes));
