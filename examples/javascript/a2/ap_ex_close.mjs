class Channel {
  #items = [];
  #takers = [];
  #putters = [];
  #closed = false;
  constructor(capacity) {
    this.capacity = capacity;
  }
  #wait(queue) {
    const { promise, resolve } = Promise.withResolvers();
    queue.push(resolve);
    return promise;
  }
  async put(item) {
    if (this.#closed) throw new Error("channel is closed");
    while (this.#items.length >= this.capacity) {
      await this.#wait(this.#putters);
    }
    this.#items.push(item);
    this.#takers.shift()?.();
  }
  close() {
    this.#closed = true;
    for (const wake of this.#takers.splice(0)) wake();
  }
  async *[Symbol.asyncIterator]() {
    while (true) {
      while (this.#items.length === 0) {
        if (this.#closed) return;
        await this.#wait(this.#takers);
      }
      const item = this.#items.shift();
      this.#putters.shift()?.();
      yield item;
    }
  }
}

const channel = new Channel(2);
async function produce() {
  for (let n = 1; n <= 6; n++) await channel.put(n);
  channel.close();
}
async function consume() {
  let sum = 0;
  for await (const n of channel) sum += n;
  return sum;
}
const [, sum] = await Promise.all([produce(), consume()]);
console.log("sum:", sum);
try {
  await channel.put(7);
} catch (error) {
  console.log(error.message);
}
