function toNumber(input) {
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
  return value;
}

function tryConvert(input) {
  try {
    return toNumber(input);
  } catch (error) {
    return `${error.name}: ${error.message}`;
  } finally {
    // runs for every input, success or failure
  }
}

for (const input of ["42", " 3.5 ", "", "abc", 7]) {
  console.log(tryConvert(input));
}
