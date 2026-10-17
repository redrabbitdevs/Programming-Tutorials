import path from "node:path";

console.log(path.join("data", "..", "logs", "app.log"));
console.log(path.resolve("/srv/app", "data", "../logs"));

const file = "/srv/app/logs/app.2026.log";
console.log(path.basename(file), path.extname(file), path.dirname(file));
console.log(path.basename(file, ".log"));
console.log(path.parse(file));
console.log(path.relative("/srv/app", file));
