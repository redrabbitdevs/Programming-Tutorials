import { Readable, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createGzip, gunzipSync } from "node:zlib";

const text = "abc ".repeat(1000);
const parts = [];
const collect = new Writable({
  write(chunk, encoding, callback) {
    parts.push(chunk);
    callback();
  },
});

await pipeline(Readable.from([text]), createGzip(), collect);
const packed = Buffer.concat(parts);
console.log(gunzipSync(packed).toString() === text, packed.length < 100);
