import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

console.log(import.meta.url.startsWith("file://"));
console.log(basename(import.meta.filename));
console.log(basename(import.meta.dirname));
console.log(fileURLToPath(import.meta.url) === import.meta.filename);

const text = readFileSync(join(import.meta.dirname, "config.json"), "utf8");
console.log(JSON.parse(text).appName);

const sibling = new URL("./config.json", import.meta.url);
console.log(JSON.parse(readFileSync(sibling, "utf8")).port);
