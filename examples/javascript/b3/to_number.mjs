const input = "abc";

try {
  if (typeof input !== "string") {
    throw new TypeError(`expected a string, got ${typeof input}`);
  }
  const text = input.trim();
  if (text === "") {
    throw new RangeError("empty input");
  }
  const value = Number(text);
  if (Number.isNaN(value)) {
    throw new RangeError(`not a number: "${text}"`);
  }
  console.log(value);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
