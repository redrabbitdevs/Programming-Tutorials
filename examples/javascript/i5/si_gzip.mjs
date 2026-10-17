import { createReadStream, createWriteStream } from "node:fs";
import { writeFile, readFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createGzip, createGunzip } from "node:zlib";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  const names = ["a.txt", "a.txt.gz", "b.txt"];
  const [plain, packed, back] = names.map((n) => join(dir, n));
  await writeFile(plain, "the same words again\n".repeat(5000));

  await pipeline(
    createReadStream(plain),
    createGzip(),
    createWriteStream(packed),
  );

  await pipeline(
    createReadStream(packed),
    createGunzip(),
    createWriteStream(back),
  );

  const sizes = [plain, packed].map(async (f) => (await readFile(f)).length);
  const [before, after] = await Promise.all(sizes);
  console.log("smaller:", after < before / 10);
  const read = (file) => readFile(file, "utf8");
  console.log("same text:", (await read(back)) === (await read(plain)));
});
