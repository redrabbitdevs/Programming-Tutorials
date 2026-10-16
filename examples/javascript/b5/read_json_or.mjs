import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function readJsonOr(file, fallback) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError || error.code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
}

const dir = mkdtempSync(join(tmpdir(), "scores-"));
const file = join(dir, "scores.json");

console.log(readJsonOr(file, []));

writeFileSync(file, "[1, 2");
console.log(readJsonOr(file, []));

writeFileSync(file, JSON.stringify([10, 20]));
console.log(readJsonOr(file, []));
