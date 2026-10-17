const words = ["zebra", "Zebra", "écrit", "apple", "eagle"];
const collator = new Intl.Collator("en");

console.log([...words].sort());
console.log([...words].sort(collator.compare));

const files = ["file10", "file2", "File1"];
const numeric = new Intl.Collator("en", { numeric: true });
console.log(files.sort(numeric.compare));
