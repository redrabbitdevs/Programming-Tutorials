import { createInterface } from "node:readline/promises";

const lines = createInterface({ input: process.stdin });
let count = 0;
for await (const line of lines) {
  count++;
  console.log(`${count}: ${line.toUpperCase()}`);
}
console.error(`${count} lines read`);
