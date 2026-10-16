class Base {
  static create() {
    return new this();
  }
}

class Derived extends Base {
  constructor() {
    try {
      this.ready = true;
    } catch (error) {
      console.log(error.name);
    }
    super();
    this.ready = true;
  }
}

console.log(Derived.create() instanceof Derived);
console.log(Object.getPrototypeOf(Derived) === Base);
