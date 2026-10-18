import { Readable } from "node:stream";

let next = 1;
const numbers = new Readable({
  objectMode: true,
  highWaterMark: 2,
  read() {
    if (next > 5) {
      this.push(null);
      return;
    }
    console.log("produce", next);
    this.push(next++);
  },
});

const settle = () => new Promise((resolve) => setImmediate(resolve));
for await (const n of numbers) {
  console.log("  consume", n);
  await settle();
}
