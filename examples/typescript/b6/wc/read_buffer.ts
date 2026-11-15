import { readFileSync } from "node:fs";

const text: string = readFileSync("notes.txt");
console.log(text.length);
