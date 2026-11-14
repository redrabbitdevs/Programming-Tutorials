function addToTotal(this: { total: number }, amount: number): void {
  this.total += amount;
}

const cart = { total: 10, addToTotal };
cart.addToTotal(5);
addToTotal.call(cart, 20);
console.log(cart.total);
