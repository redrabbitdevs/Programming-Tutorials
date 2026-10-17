function formatList(items, width) {
  const quoted = items.map((item) => JSON.stringify(item));
  const oneLine = `[${quoted.join(", ")}]`;
  if (oneLine.length <= width) return oneLine;
  return ["[", ...quoted.map((q) => `  ${q},`), "]"].join("\n");
}

console.log(formatList(["aa", "bb", "cc"], 20));
console.log(formatList(["aaaaaaaa", "bbbbbbbb", "cccccccc"], 20));
