import { createInterface } from "node:readline";
import { Readable } from "node:stream";

const input = Readable.from([
  '{"id":1,"ok":true}\n{"id":2,',
  '"ok":false}\nnot json\n\n{"id":3,"ok":true}\n',
]);

let lineNumber = 0;
for await (const line of createInterface({ input, crlfDelay: Infinity })) {
  lineNumber++;
  if (line.trim() === "") continue;
  try {
    console.log(JSON.parse(line));
  } catch (error) {
    console.log(`line ${lineNumber}: ${error.name}`);
  }
}
