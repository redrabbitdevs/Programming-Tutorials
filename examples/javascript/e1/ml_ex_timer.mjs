import { writeHeapSnapshot } from "node:v8";

class Connection {
  constructor(id) {
    this.id = id;
    this.log = [];
    this.timer = setInterval(() => this.log.push(Date.now()), 1000);
  }
  close() {
    clearInterval(this.timer);
  }
}

function serve() {
  const open = new Set();
  for (let id = 0; id < 300; id++) open.add(new Connection(id));
  if (process.argv[2] === "leak") return;
  for (const connection of open) connection.close();
}

serve();
writeHeapSnapshot("timer.heapsnapshot");
console.log("served 300 connections");
process.exit();
