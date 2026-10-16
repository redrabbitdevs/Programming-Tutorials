import { createInterface } from "node:readline";
import { Readable } from "node:stream";

const input = Readable.from(["one\ntw", "o\nthree\n"]);
const lines = createInterface({ input });

for await (const line of lines) {
  console.log("line:", line);
}
