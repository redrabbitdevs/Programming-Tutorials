import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const upper = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

await withTempDir(async (dir) => {
  const target = join(dir, "out.txt");
  const source = Readable.from(["hello ", "streams\n"]);
  await pipeline(source, upper, createWriteStream(target));
  console.log(JSON.stringify(await readFile(target, "utf8")));
});

async function* exclaim(source) {
  for await (const chunk of source) yield chunk.toString().toUpperCase() + "!";
}

await withTempDir(async (dir) => {
  const target = join(dir, "out2.txt");
  await pipeline(Readable.from(["wow"]), exclaim, createWriteStream(target));
  console.log(await readFile(target, "utf8"));
});
