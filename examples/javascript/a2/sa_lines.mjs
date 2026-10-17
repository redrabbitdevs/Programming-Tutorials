import { Readable } from "node:stream";

async function* splitLines(source) {
  const decoder = new TextDecoder();
  let rest = "";
  for await (const chunk of source) {
    rest += decoder.decode(chunk, { stream: true });
    const lines = rest.split("\n");
    rest = lines.pop();
    yield* lines;
  }
  rest += decoder.decode();
  if (rest) yield rest;
}

const bytes = new TextEncoder().encode("café au lait\nthé\nmate");
const chunks = [bytes.slice(0, 4), bytes.slice(4, 15), bytes.slice(15)];
console.log(chunks.map((chunk) => new TextDecoder().decode(chunk)));

for await (const line of splitLines(Readable.from(chunks))) {
  console.log(JSON.stringify(line));
}
