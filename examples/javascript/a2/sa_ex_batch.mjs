import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

function batch(size) {
  return async function* (source) {
    let current = [];
    for await (const item of source) {
      current.push(item);
      if (current.length === size) {
        yield current;
        current = [];
      }
    }
    if (current.length > 0) yield current;
  };
}

const batches = [];
await pipeline(Readable.from([1, 2, 3, 4, 5, 6, 7]), batch(3),
  async function (source) {
    for await (const group of source) batches.push(group);
  });
console.log(batches);
