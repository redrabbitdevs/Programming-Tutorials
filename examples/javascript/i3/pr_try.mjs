function parse(text) {
  if (text === "") throw new Error("empty input");
  return JSON.parse(text);
}

console.log(await Promise.try(parse, '{"a":1}'));
try {
  await Promise.try(parse, "");
} catch (error) {
  console.log("rejected:", error.message);
}

try {
  Promise.resolve(parse(""));
} catch (error) {
  console.log("threw at once:", error.message);
}
