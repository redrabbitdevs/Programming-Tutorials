class Stack {
  items = [];

  static from(values) {
    const stack = new Stack();
    for (const value of values) {
      stack.push(value);
    }
    return stack;
  }

  push(value) {
    this.items.push(value);
    return this;
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items.at(-1);
  }

  get size() {
    return this.items.length;
  }
}

const stack = Stack.from([1, 2, 3]);
console.log(stack.size, stack.peek());
console.log(stack.pop(), stack.pop(), stack.size);
console.log(new Stack().peek());
