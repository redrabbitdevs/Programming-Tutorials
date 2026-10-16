class Queue {
  #items = new Map();
  #head = 0;

  enqueue(value) {
    this.#items.set(this.#head + this.#items.size, value);
  }

  dequeue() {
    const value = this.#items.get(this.#head);
    if (this.#items.delete(this.#head)) {
      this.#head += 1;
    }
    return value;
  }

  get size() {
    return this.#items.size;
  }
}

const queue = new Queue();
queue.enqueue("first");
queue.enqueue("second");
console.log(queue.dequeue(), queue.size);
console.log(queue.dequeue(), queue.dequeue(), queue.size);
