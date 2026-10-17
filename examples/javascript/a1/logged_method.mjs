function logged(value, { kind, name }) {
  if (kind !== "method") return;
  return function (...args) {
    console.log(`-> ${name}(${args.join(", ")})`);
    const result = value.call(this, ...args);
    console.log(`<- ${name} = ${result}`);
    return result;
  };
}

class Calculator {
  constructor(base) {
    this.base = base;
  }
  add(a, b) {
    return this.base + a + b;
  }
}

const proto = Calculator.prototype;
proto.add = logged(proto.add, { kind: "method", name: "add" }) ?? proto.add;

console.log(new Calculator(100).add(2, 3));
