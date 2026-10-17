function deprecated(value, { name }) {
  let warned = false;
  return function (...args) {
    if (!warned) {
      warned = true;
      console.log(`warning: ${String(name)} is deprecated`);
    }
    return value.call(this, ...args);
  };
}

function decorateMethod(Class, name, decorator) {
  const original = Class.prototype[name];
  const context = { kind: "method", name, static: false, private: false };
  Class.prototype[name] = decorator(original, context) ?? original;
}

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  toF() {
    return this.celsius * 1.8 + 32;
  }
}

decorateMethod(Temperature, "toF", deprecated);
console.log(new Temperature(100).toF(), new Temperature(0).toF());
