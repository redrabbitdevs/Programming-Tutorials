import { createReadStream, createWriteStream } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

async function* csvRows(count) {
  yield "id,name,amount\n";
  for (let id = 1; id <= count; id++) {
    yield `${id},item${id},${(id * 1.25).toFixed(2)}\n`;
  }
}

async function* csvToJsonLines(lines) {
  let header;
  for await (const line of lines) {
    if (line === "") continue;
    const cells = line.split(",");
    if (!header) {
      header = cells;
      continue;
    }
    const row = Object.fromEntries(header.map((key, i) => [key, cells[i]]));
    row.id = Number(row.id);
    row.amount = Number(row.amount);
    yield JSON.stringify(row) + "\n";
  }
}

const dir = await mkdtemp(join(tmpdir(), "csv-"));
try {
  const csv = join(dir, "items.csv");
  const out = join(dir, "items.jsonl");
  await pipeline(Readable.from(csvRows(10_000)), createWriteStream(csv));
  const lines = createInterface({ input: createReadStream(csv) });
  await pipeline(lines, csvToJsonLines, createWriteStream(out));

  const result = (await readFile(out, "utf8")).trimEnd().split("\n");
  console.log(result.slice(0, 2).join("\n"));
  console.log(result.length, "rows");
} finally {
  await rm(dir, { recursive: true });
}
