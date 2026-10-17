#!/usr/bin/env node
import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";

const options = {
  "ignore-case": { type: "boolean", short: "i" },
  "line-numbers": { type: "boolean", short: "n" },
};

function parse(argv) {
  try {
    return parseArgs({ args: argv, options, allowPositionals: true });
  } catch (error) {
    console.error(`grep: ${error.message}`);
    return null;
  }
}

async function main(argv) {
  const parsed = parse(argv);
  if (parsed === null) return 2;
  const [pattern, ...files] = parsed.positionals;
  if (pattern === undefined || files.length === 0) {
    console.error("usage: ct_grep [-i] [-n] pattern file...");
    return 2;
  }
  const ignoreCase = parsed.values["ignore-case"];
  const needle = ignoreCase ? pattern.toLowerCase() : pattern;
  let found = false;
  for (const file of files) {
    let text;
    try {
      text = await readFile(file, "utf8");
    } catch (error) {
      console.error(`grep: ${file}: ${error.code}`);
      return 2;
    }

    text.split("\n").forEach((line, index) => {
      const hay = ignoreCase ? line.toLowerCase() : line;
      if (!hay.includes(needle)) return;
      found = true;
      const where = files.length > 1 ? `${file}:` : "";
      const number = parsed.values["line-numbers"] ? `${index + 1}:` : "";
      console.log(`${where}${number}${line}`);
    });
  }
  return found ? 0 : 1;
}

process.exitCode = await main(process.argv.slice(2));
