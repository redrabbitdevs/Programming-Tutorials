function strictParse(text) {
  return JSON.parse(text, (key, value, { source }) => {
    const isInteger = typeof value === "number" && /^-?\d+$/.test(source);
    if (isInteger && !Number.isSafeInteger(value)) {
      throw new RangeError(`lossy number at "${key}": ${source}`);
    }
    return value;
  });
}

const inputs = [
  '{"count": 3, "total": 120}',
  '{"count": 3, "total": 90071992547409930}',
];
for (const text of inputs) {
  try {
    console.log(strictParse(text));
  } catch (error) {
    console.log(error.message);
  }
}
