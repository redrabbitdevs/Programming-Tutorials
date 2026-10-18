import { Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

async function* endlessRows() {
  try {
    for (let id = 1; ; id++) yield { id };
  } finally {
    console.log("source cleaned up");
  }
}

const strict = new Writable({
  objectMode: true,
  write(row, encoding, callback) {
    const bad = row.id === 3;
    callback(bad ? new Error(`row ${row.id} rejected`) : null);
  },
});

try {
  await pipeline(endlessRows, strict);
} catch (error) {
  console.log("pipeline failed:", error.message);
}

const controller = new AbortController();
const sink = new Writable({
  objectMode: true,
  write(row, encoding, callback) {
    if (row.id === 2) controller.abort();
    callback();
  },
});

try {
  await pipeline(endlessRows, sink, { signal: controller.signal });
} catch (error) {
  console.log("pipeline failed:", error.name);
}
