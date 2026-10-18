import { Worker } from "node:worker_threads";

export class WorkerPool {
  #workers = [];
  #idle = [];
  #queue = [];
  constructor(url, size) {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(url);
      this.#workers.push(worker);
      this.#idle.push(worker);
    }
  }
  run(data) {
    const { promise, resolve } = Promise.withResolvers();
    this.#queue.push({ data, resolve });
    this.#next();
    return promise;
  }
  #next() {
    if (this.#queue.length === 0 || this.#idle.length === 0) return;
    const worker = this.#idle.pop();
    const { data, resolve } = this.#queue.shift();
    worker.once("message", (result) => {
      this.#idle.push(worker);
      resolve(result);
      this.#next();
    });
    worker.postMessage(data);
  }
  async close() {
    await Promise.all(this.#workers.map((worker) => worker.terminate()));
  }
}
