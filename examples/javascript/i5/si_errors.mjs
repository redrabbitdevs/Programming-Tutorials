import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const checker = new Transform({
  objectMode: true,
  transform(value, encoding, callback) {
    if (value < 0) return callback(new Error(`negative number: ${value}`));
    callback(null, value * 2);
  },
});
const seen = [];
const sink = new Writable({
  objectMode: true,
  write(value, encoding, callback) {
    seen.push(value);
    callback();
  },
});

try {
  await pipeline(Readable.from([1, 2, -3, 4]), checker, sink);
} catch (error) {
  console.log("pipeline failed:", error.message);
}
console.log("sink saw", seen, "and destroyed:", sink.destroyed);
