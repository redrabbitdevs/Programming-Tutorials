const plural = new Intl.PluralRules("en");
const list = new Intl.ListFormat("en");

function summary(files) {
  const word = plural.select(files.length) === "one" ? "file" : "files";
  if (files.length === 0) {
    return "No files";
  }
  return `${files.length} ${word}: ${list.format(files)}`;
}

console.log(summary([]));
console.log(summary(["a.txt"]));
console.log(summary(["a.txt", "b.txt"]));
console.log(summary(["a.txt", "b.txt", "c.txt"]));
