class Channel {
  #items = [];
  #takers = [];
  #putters = [];
  constructor(capacity) {
    this.capacity = capacity;
  }
  #wait(queue) {
    const { promise, resolve } = Promise.withResolvers();
    queue.push(resolve);
    return promise;
  }
  async put(item) {
    while (this.#items.length >= this.capacity) {
      await this.#wait(this.#putters);
    }
    this.#items.push(item);
    this.#takers.shift()?.();
  }
  async take() {
    while (this.#items.length === 0) {
      await this.#wait(this.#takers);
    }
    const item = this.#items.shift();
    this.#putters.shift()?.();
    return item;
  }
}

const settle = () => new Promise((resolve) => setImmediate(resolve));
const channel = new Channel(2);

async function producer() {
  for (let n = 1; n <= 5; n++) {
    await channel.put(n);
    console.log("put", n);
  }
}

async function consumer() {
  for (let i = 0; i < 5; i++) {
    const n = await channel.take();
    await settle();
    console.log("  processed", n);
  }
}

await Promise.all([producer(), consumer()]);
