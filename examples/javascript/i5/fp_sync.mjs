import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = mkdtempSync(join(tmpdir(), "sync-"));
const file = join(dir, "settings.json");
console.log(existsSync(file));

writeFileSync(file, JSON.stringify({ retries: 3 }));
console.log(JSON.parse(readFileSync(file, "utf8")));
rmSync(dir, { recursive: true });
