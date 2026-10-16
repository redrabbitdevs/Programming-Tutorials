const Serializable = (Base) =>
  class extends Base {
    serialize() {
      return JSON.stringify(this);
    }
  };

const Comparable = (Base) =>
  class extends Base {
    compareTo(other) {
      return this.value - other.value;
    }
  };

class Item {
  constructor(value) {
    this.value = value;
  }
}

class Product extends Serializable(Comparable(Item)) {}

const a = new Product(3);
console.log(a.serialize(), a.compareTo(new Product(1)));
console.log(a instanceof Item);
