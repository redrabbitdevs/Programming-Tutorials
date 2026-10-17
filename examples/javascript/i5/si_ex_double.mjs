import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const double = new Transform({
  objectMode: true,
  transform(n, encoding, callback) {
    callback(null, n * 2);
  },
});
const results = [];
const collect = new Writable({
  objectMode: true,
  write(n, encoding, callback) {
    results.push(n);
    callback();
  },
});

await pipeline(Readable.from([1, 2, 3]), double, collect);
console.log(results);
