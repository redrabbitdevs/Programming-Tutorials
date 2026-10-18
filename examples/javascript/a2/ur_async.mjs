import { setTimeout as sleep } from "node:timers/promises";

class BufferedLog {
  #lines = [];
  write(line) {
    this.#lines.push(line);
  }
  async [Symbol.asyncDispose]() {
    await sleep(10);
    console.log(`flushed ${this.#lines.length} lines`);
  }
}

async function job() {
  await using log = new BufferedLog();
  log.write("start");
  log.write("end");
  console.log("job body done");
}

await job();
console.log("after job");
