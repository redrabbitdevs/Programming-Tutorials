import { createWriteStream, createReadStream } from "node:fs";
import { once } from "node:events";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  const file = join(dir, "big.txt");
  const out = createWriteStream(file);
  for (let i = 0; i < 100000; i++) {
    if (!out.write("some text line\n")) await once(out, "drain");
  }
  out.end();
  await once(out, "finish");
  console.log("file written");

  let chunks = 0;
  let newlines = 0;
  let largest = 0;
  for await (const chunk of createReadStream(file)) {
    chunks++;
    largest = Math.max(largest, chunk.length);
    for (const byte of chunk) if (byte === 10) newlines++;
  }
  console.log(`${chunks} chunks, largest ${largest} bytes`);
  console.log(`${newlines} newlines`);
});
