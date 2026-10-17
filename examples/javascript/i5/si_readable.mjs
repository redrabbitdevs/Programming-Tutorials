import { Readable } from "node:stream";

for await (const chunk of Readable.from(["a", "b", "c"])) {
  console.log("chunk:", chunk);
}

async function* countdown(from) {
  for (let n = from; n > 0; n--) yield { n };
}
const seen = [];
for await (const item of Readable.from(countdown(3))) seen.push(item.n);
console.log(seen);
