import { fork } from "node:child_process";
import { once } from "node:events";

const child = fork(new URL("./cp_ex_counter_child.mjs", import.meta.url));
const exited = once(child, "exit");

async function request(command) {
  child.send(command);
  const [reply] = await once(child, "message");
  return reply.total;
}

console.log("after add 5:", await request({ op: "add", n: 5 }));
console.log("after add 7:", await request({ op: "add", n: 7 }));
console.log("get:", await request({ op: "get" }));
child.send({ op: "quit" });
const [code] = await exited;
console.log("child exit code:", code);
