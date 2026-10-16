class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  #head = null;
  #size = 0;

  prepend(value) {
    this.#head = new ListNode(value, this.#head);
    this.#size += 1;
    return this;
  }

  get size() {
    return this.#size;
  }

  *[Symbol.iterator]() {
    for (let node = this.#head; node !== null; node = node.next) {
      yield node.value;
    }
  }
}

const list = new LinkedList().prepend(3).prepend(2).prepend(1);
console.log([...list], list.size);
console.log(Math.max(...list));
