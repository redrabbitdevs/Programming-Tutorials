class Stack extends Array {}

class PlainStack extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const doubled = Stack.of(1, 2, 3).map((n) => n * 2);
const plain = PlainStack.of(1, 2, 3).map((n) => n * 2);
console.log(doubled instanceof Stack, plain instanceof PlainStack);
console.log(plain instanceof Array, Array.isArray(plain));
