import { Readable } from "node:stream";
import { createInterface } from "node:readline";

const chunks = ["alpha\nbe", "ta\ngam", "ma\n"];
const lines = createInterface({ input: Readable.from(chunks) });

let number = 0;
for await (const line of lines) {
  number++;
  console.log(`${number}: ${line}`);
}
