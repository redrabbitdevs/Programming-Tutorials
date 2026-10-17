import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const upper = () => new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

const web = Readable.toWeb(Readable.from(["node ", "to web"]));
const back = Readable.fromWeb(web.pipeThrough(upper()), { objectMode: true });
for await (const chunk of back) console.log(JSON.stringify(chunk));

const collected = [];
await pipeline(Readable.from(["mixed ", "pipeline"]), upper(),
  async function (source) {
    for await (const chunk of source) collected.push(chunk);
  });
console.log(collected.join(""));
