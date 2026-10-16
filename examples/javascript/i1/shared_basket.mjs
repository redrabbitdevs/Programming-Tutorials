function Basket() {
  this.items = [];
}

Basket.prototype.add = function (item) {
  this.items.push(item);
  return this;
};

const first = new Basket().add("apple");
const second = new Basket().add("pear");

console.log(first.items, second.items);
console.log(first.items === second.items);
