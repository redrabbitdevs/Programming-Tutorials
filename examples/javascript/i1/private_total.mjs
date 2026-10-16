class Cart {
  #prices = [];

  add(price) {
    this.#prices.push(price);
    return this;
  }

  get total() {
    return this.#sum();
  }

  #sum() {
    return this.#prices.reduce((sum, price) => sum + price, 0);
  }

  static sameSize(a, b) {
    return a.#prices.length === b.#prices.length;
  }
}

const one = new Cart().add(5);
const two = new Cart().add(1).add(2);
console.log(one.total, two.total);
console.log(Cart.sameSize(one, new Cart().add(9)), Cart.sameSize(one, two));
