const orders = [
  { id: 1, customer: "Ada", total: 40, paid: true },
  { id: 2, customer: "Linus", total: 15, paid: false },
  { id: 3, customer: "Grace", total: 90, paid: true },
  { id: 4, customer: "Ada", total: 25, paid: true },
];

const totals = orders.map((o) => o.total);
console.log(totals);

const paid = orders.filter((o) => o.paid);
console.log(paid.map((o) => o.id));

const revenue = paid.reduce((sum, o) => sum + o.total, 0);
console.log(revenue);

const byCustomer = orders.reduce((acc, o) => {
  acc[o.customer] = (acc[o.customer] ?? 0) + o.total;
  return acc;
}, {});
console.log(byCustomer);

console.log(orders.map((o, i) => `${i + 1}. ${o.customer}`));
console.log(orders.forEach((o) => o.id));
