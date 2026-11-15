import { readFileSync } from "node:fs";

const text: string = readFileSync("notes.txt", "utf8");
console.log(text.length);
