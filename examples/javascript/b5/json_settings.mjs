import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = mkdtempSync(join(tmpdir(), "settings-"));
const file = join(dir, "settings.json");

const defaults = { theme: "light", fontSize: 14, recent: [] };
writeFileSync(file, JSON.stringify(defaults, null, 2) + "\n");

const settings = JSON.parse(readFileSync(file, "utf8"));
settings.theme = "dark";
settings.recent.push("notes.txt");
writeFileSync(file, JSON.stringify(settings, null, 2) + "\n");

console.log(readFileSync(file, "utf8"));
