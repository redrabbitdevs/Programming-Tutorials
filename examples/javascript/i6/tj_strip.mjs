import { execFileSync } from "node:child_process";
import { join } from "node:path";

const file = join(import.meta.dirname, "tj_main.ts");
const output = execFileSync(process.execPath, [file], { encoding: "utf8" });
console.log(output.trimEnd());
