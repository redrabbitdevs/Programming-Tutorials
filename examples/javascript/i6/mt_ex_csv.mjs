export function toCsv(rows) {
  const quote = (text) => `"${text.replaceAll('"', '""')}"`;
  const cell = (v) => (/[",\n]/.test(v) ? quote(v) : String(v));
  return rows.map((row) => row.map(cell).join(",")).join("\n");
}
