export class Semaphore {
  #free;
  #waiting = [];
  constructor(count) {
    this.#free = count;
  }
  async acquire() {
    if (this.#free > 0) {
      this.#free--;
      return;
    }
    const { promise, resolve } = Promise.withResolvers();
    this.#waiting.push(resolve);
    await promise;
  }
  release() {
    if (this.#waiting.length > 0) this.#waiting.shift()();
    else this.#free++;
  }
}
