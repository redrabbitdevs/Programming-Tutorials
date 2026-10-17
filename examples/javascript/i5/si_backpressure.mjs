import { Writable } from "node:stream";
import { once } from "node:events";

const slow = new Writable({
  highWaterMark: 4,
  write(chunk, encoding, callback) {
    setTimeout(callback, 1);
  },
});

console.log(slow.write("abc"));
console.log(slow.write("de"));
console.log(slow.writableLength, slow.writableNeedDrain);
await once(slow, "drain");
console.log("drained", slow.writableLength);
