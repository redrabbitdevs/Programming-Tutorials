import { fork } from "node:child_process";
import { once } from "node:events";

const child = fork(new URL("./cp_fork_child.mjs", import.meta.url));
const exited = once(child, "exit");

const jobs = [
  { id: 1, text: "the quick brown fox" },
  { id: 2, text: "jumps over" },
];
for (const job of jobs) {
  child.send(job);
  const [reply] = await once(child, "message");
  console.log(reply);
}

child.disconnect();
const [code] = await exited;
console.log("child exit code:", code);
