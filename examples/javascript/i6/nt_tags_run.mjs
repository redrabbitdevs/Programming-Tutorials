import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const source = `
import { describe, it, test } from "node:test";
test("parses numbers", { tags: ["fast", "unit"] }, () => {});
test("talks to the network", { tags: ["slow"] }, () => {});
test("has no tags", () => {});
describe("suite", { tags: ["unit"] }, () => {
  it("inherits unit", () => {});
  it("is also slow", { tags: ["slow"] }, () => {});
});
`;

function ranTests(dir, filter) {
  const flag = "--experimental-test-tag-filter=" + filter;
  const args = ["--test", flag, "tags.test.mjs"];
  const run = spawnSync(process.execPath, args, { cwd: dir, encoding: "utf8" });
  return run.stdout
    .split("\n")
    .filter((line) => /^\s*✔/.test(line) && !/suite/.test(line))
    .map((line) => line.trim().replace(/ \([\d.]+ms\)$/, ""));
}

await withTempDir(async (dir) => {
  await writeFile(join(dir, "tags.test.mjs"), source);
  console.log("not slow:", ranTests(dir, "not slow"));
  console.log("unit and not slow:", ranTests(dir, "unit and not slow"));
});
