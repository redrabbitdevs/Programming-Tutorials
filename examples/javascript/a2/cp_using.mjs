import { spawn } from "node:child_process";
import { once } from "node:events";

const server = ["-e", "setInterval(() => {}, 1000)"];
let exited;
{
  using child = spawn(process.execPath, server);
  exited = once(child, "exit");
  console.log("child running:", child.exitCode === null);
}
const [code, signal] = await exited;
console.log("after the block:", { code, signal });
