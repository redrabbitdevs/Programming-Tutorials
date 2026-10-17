#!/usr/bin/env node
import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";

const options = {
  "ignore-case": { type: "boolean", short: "i" },
  "line-numbers": { type: "boolean", short: "n" },
};

function parse(argv) {
  try {
    const parsed = parseArgs({ args: argv, options, allowPositionals: true });
    if (parsed.positionals.length >= 2) return parsed;
    console.error("usage: ct_grep [-i] [-n] pattern file...");
  } catch (error) {
    console.error(`grep: ${error.message}`);
  }
  return null;
}

function compile(pattern, ignoreCase) {
  try {
    return new RegExp(pattern, ignoreCase ? "i" : "");
  } catch (error) {
    console.error(`grep: ${error.message}`);
    return null;
  }
}

async function grepFile(file, regex, flags) {
  const lines = (await readFile(file, "utf8")).split("\n");
  if (lines.at(-1) === "") lines.pop();
  let found = false;
  lines.forEach((line, index) => {
    if (!regex.test(line)) return;
    found = true;
    const where = flags.prefix ? `${file}:` : "";
    const number = flags.numbers ? `${index + 1}:` : "";
    console.log(`${where}${number}${line}`);
  });
  return found;
}

async function grepAll(files, regex, flags) {
  let found = false;
  for (const file of files) {
    try {
      found = (await grepFile(file, regex, flags)) || found;
    } catch (error) {
      console.error(`grep: ${file}: ${error.code}`);
      return 2;
    }
  }
  return found ? 0 : 1;
}

async function main(argv) {
  const parsed = parse(argv);
  if (parsed === null) return 2;
  const [pattern, ...files] = parsed.positionals;
  const regex = compile(pattern, parsed.values["ignore-case"]);
  if (regex === null) return 2;
  const numbers = parsed.values["line-numbers"];
  return grepAll(files, regex, { prefix: files.length > 1, numbers });
}

process.exitCode = await main(process.argv.slice(2));
