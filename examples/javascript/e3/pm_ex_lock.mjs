// A note-taking script that should only ever touch pm_notes/.
import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
import { createConnection } from "node:net";
import { once } from "node:events";

mkdirSync("pm_notes", { recursive: true });
appendFileSync("pm_notes/today.txt", `${process.argv[2] ?? "note"}\n`);
console.log(readFileSync("pm_notes/today.txt", "utf8").trim());
console.log("may write x.txt:", process.permission?.has("fs.write", "x.txt"));

// A "telemetry" call that a dependency might make behind your back.
// Port 9 on this machine has no listener, so an allowed call is refused.
const socket = createConnection(9, "127.0.0.1");
const [error] = await once(socket, "error");
console.log("telemetry:", error.code);
