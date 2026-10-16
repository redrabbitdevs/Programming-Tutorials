import { readFile } from "node:fs/promises";

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log("before");
await pause(20);
console.log("after 20 ms");

const file = new URL("./config.json", import.meta.url);
const text = await readFile(file, "utf8");
console.log(JSON.parse(text).features);
