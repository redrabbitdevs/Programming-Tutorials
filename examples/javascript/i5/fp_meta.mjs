import path from "node:path";

console.log(path.basename(import.meta.filename));
console.log(import.meta.dirname === path.dirname(import.meta.filename));
console.log(import.meta.url.startsWith("file:///"));
const dataFile = path.join(import.meta.dirname, "data", "users.json");
console.log(path.basename(dataFile), path.basename(path.dirname(dataFile)));
