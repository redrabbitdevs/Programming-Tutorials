import { createInterface } from "node:readline/promises";

let sum = 0;
for await (const line of createInterface({ input: process.stdin })) {
  if (line.trim() === "") continue;
  const value = Number(line);
  if (Number.isNaN(value)) {
    console.error(`skipped: ${line}`);
  } else {
    sum += value;
  }
}
console.log(`sum: ${sum}`);
