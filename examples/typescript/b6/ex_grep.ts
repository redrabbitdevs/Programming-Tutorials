import { readFileSync } from "node:fs";

function matching(text: string, word: string): string[] {
  return text.split("\n").filter((line) => line.includes(word));
}

const word = process.argv[2] ?? "error";
for (const line of matching(readFileSync(0, "utf8"), word)) {
  console.log(line);
}
