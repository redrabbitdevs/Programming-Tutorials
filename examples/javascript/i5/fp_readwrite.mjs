import { writeFile, appendFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  const file = join(dir, "notes.txt");
  await writeFile(file, "first line\n");
  await appendFile(file, "second line\n");

  const text = await readFile(file, "utf8");
  console.log(JSON.stringify(text));

  const bytes = await readFile(file);
  console.log(bytes.length, bytes instanceof Uint8Array);
});
