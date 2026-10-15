let a = 5;
let b = a;
b = 6;
console.log(a, b);

const list1 = [1, 2, 3];
const list2 = list1;
list2.push(4);
console.log(list1, list1 === list2);

const other = [1, 2, 3, 4];
console.log(list1 === other);

function addItem(list, item) {
  list.push(item);
}
const cart = ["pen"];
addItem(cart, "ink");
console.log(cart);

function reassign(list) {
  list = ["new"];
  return list;
}
console.log(reassign(cart), cart);
