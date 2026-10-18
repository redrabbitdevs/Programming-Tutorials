import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const filter = `
  const rl = require("node:readline").createInterface({ input: process.stdin });
  rl.on("line", (line) => {
    if (line.includes("ERROR")) console.log(line.toUpperCase());
  });
`;
const child = spawn(process.execPath, ["-e", filter]);
const exited = once(child, "exit");

const log = ["ok start", "ERROR disk full", "ok retry", "ERROR again"];
const feeding = pipeline(Readable.from(log.map((l) => l + "\n")), child.stdin);

const found = [];
for await (const line of createInterface({ input: child.stdout })) {
  found.push(line);
}
await feeding;
const [code] = await exited;
console.log(found, "exit code:", code);
