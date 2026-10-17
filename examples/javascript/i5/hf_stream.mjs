import { startServer } from "./hf_helper.mjs";

const { url, stop } = await startServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  let n = 0;
  const timer = setInterval(() => {
    res.write(`line ${++n}\n`);
    if (n === 3) {
      clearInterval(timer);
      res.end();
    }
  }, 10);
});

const response = await fetch(url);
let text = "";
for await (const part of response.body.pipeThrough(new TextDecoderStream())) {
  text += part;
}
console.log(JSON.stringify(text));
await stop();
