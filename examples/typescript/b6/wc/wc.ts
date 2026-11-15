import { readFileSync } from "node:fs";
import config from "./config.json" with { type: "json" };
import { count } from "./count.ts";
import type { Counts } from "./count.ts";

function format(counts: Counts, label: string): string {
  const cells = [counts.lines, counts.words, counts.bytes];
  const padded = cells.map((n) => String(n).padStart(config.width));
  return `${padded.join("")} ${label}`.trimEnd();
}

function readText(file: string | undefined): string {
  return readFileSync(file ?? 0, "utf8");
}

const files = process.argv.slice(2);
const targets = files.length > 0 ? files : [undefined];

for (const file of targets) {
  try {
    console.log(format(count(readText(file)), file ?? ""));
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`wc: ${reason}`);
    process.exitCode = 1;
  }
}
