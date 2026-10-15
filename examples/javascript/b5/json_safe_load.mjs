import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function loadSettings(file, defaults) {
  if (!existsSync(file)) return { ...defaults };
  try {
    return { ...defaults, ...JSON.parse(readFileSync(file, "utf8")) };
  } catch (error) {
    if (error instanceof SyntaxError) return { ...defaults };
    throw error;
  }
}

const dir = mkdtempSync(join(tmpdir(), "load-"));
const defaults = { theme: "light", fontSize: 14 };

console.log(loadSettings(join(dir, "missing.json"), defaults));

writeFileSync(join(dir, "broken.json"), "{ theme: dark");
console.log(loadSettings(join(dir, "broken.json"), defaults));

writeFileSync(join(dir, "good.json"), '{"fontSize": 18}');
console.log(loadSettings(join(dir, "good.json"), defaults));
