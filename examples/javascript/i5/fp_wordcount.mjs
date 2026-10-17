import { writeFile, readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const countWords = (text) => text.split(/\s+/).filter(Boolean).length;

await withTempDir(async (dir) => {
  await writeFile(join(dir, "a.txt"), "one two three\n");
  await writeFile(join(dir, "b.txt"), "four\nfive six\n\nseven\n");
  await writeFile(join(dir, "skip.md"), "ignored text");

  const names = (await readdir(dir)).filter((n) => extname(n) === ".txt");
  const counts = await Promise.all(
    names.sort().map(async (name) => {
      const text = await readFile(join(dir, name), "utf8");
      return `${name}: ${countWords(text)}`;
    }),
  );
  console.log(counts.join("\n"));
});
