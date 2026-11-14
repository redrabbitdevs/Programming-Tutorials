type ParseResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

function parseNumber(text: string): ParseResult {
  const value = Number(text);
  if (Number.isNaN(value)) {
    return { ok: false, error: `"${text}" is not a number` };
  }
  return { ok: true, value };
}

for (const text of ["42", "abc"]) {
  const result = parseNumber(text);
  console.log(result.ok ? result.value * 2 : result.error);
}
