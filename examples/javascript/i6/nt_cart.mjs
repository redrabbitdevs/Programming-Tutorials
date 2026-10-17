export class Cart {
  #items = [];

  add(name, price, quantity = 1) {
    if (price < 0) throw new RangeError("price must not be negative");
    this.#items.push({ name, price, quantity });
    return this;
  }

  get count() {
    return this.#items.reduce((sum, item) => sum + item.quantity, 0);
  }

  total() {
    return this.#items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
