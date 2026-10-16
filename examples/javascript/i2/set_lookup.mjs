const orders = [
  { id: 1, customer: "ada" },
  { id: 2, customer: "bob" },
  { id: 3, customer: "ada" },
  { id: 4, customer: "cyd" },
];
const blocked = new Set(["bob", "cyd"]);

const allowed = orders.filter((order) => !blocked.has(order.customer));
console.log(allowed.map((order) => order.id));

const customers = new Set(orders.map((order) => order.customer));
console.log(customers.size, [...customers].join(","));
