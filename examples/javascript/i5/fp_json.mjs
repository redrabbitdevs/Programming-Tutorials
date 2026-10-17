import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  const file = join(dir, "settings.json");
  const settings = { theme: "dark", fontSize: 14, tags: ["a", "b"] };
  await writeFile(file, JSON.stringify(settings, null, 2));

  const loaded = JSON.parse(await readFile(file, "utf8"));
  console.log(loaded);
  console.log(loaded.tags !== settings.tags);
});
