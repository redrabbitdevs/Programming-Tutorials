import { startServer } from "./hf_helper.mjs";

const { url, stop } = await startServer((req, res) => res.end("hi"));
console.log(await (await fetch(url)).text());

process.once("SIGINT", async () => {
  await stop();
  console.log("server closed");
});
process.kill(process.pid, "SIGINT");
