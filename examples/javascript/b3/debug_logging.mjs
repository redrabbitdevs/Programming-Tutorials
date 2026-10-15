const orders = [
  { id: 1, item: "pen", qty: 3, price: 1.5 },
  { id: 2, item: "book", qty: 1, price: 12 },
];

let total = 0;
for (const order of orders) {
  console.log("order:", order);
  total += order.qty * order.price;
}
console.log({ total });
console.table(orders);
console.group("details");
console.log("inside the group");
console.groupEnd();
console.count("check");
console.count("check");
