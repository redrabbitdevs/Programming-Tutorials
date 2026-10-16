class Stack extends Array {
  peek() {
    return this.at(-1);
  }
}

const stack = new Stack();
stack.push(1, 2, 3);
console.log(stack.length, stack.peek(), Array.isArray(stack));

const doubled = stack.map((n) => n * 2);
console.log(doubled instanceof Stack, doubled.peek());
console.log(stack);
