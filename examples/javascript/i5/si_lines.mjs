import { createWriteStream, createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { once } from "node:events";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  const file = join(dir, "words.txt");
  const out = createWriteStream(file);
  for (let i = 1; i <= 50000; i++) out.write(`line number ${i}\n`);
  out.end();
  await once(out, "finish");

  let count = 0;
  let longest = "";
  const input = createReadStream(file);
  const lines = createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    count++;
    if (line.length > longest.length) longest = line;
  }
  console.log(count, longest);
});
