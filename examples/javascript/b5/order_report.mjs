const orders = [
  { id: 1, customer: "Ada", total: 40, paid: true },
  { id: 2, customer: "Linus", total: 15, paid: false },
  { id: 3, customer: "Grace", total: 90, paid: true },
  { id: 4, customer: "Ada", total: 25, paid: true },
];

const paid = orders.filter((o) => o.paid);
const revenue = paid.reduce((sum, o) => sum + o.total, 0);
const unpaidIds = orders.filter((o) => !o.paid).map((o) => o.id);
const customers = [...new Set(orders.map((o) => o.customer))];
const biggest = orders.reduce((best, o) => (o.total > best.total ? o : best));

console.log(`Paid orders: ${paid.length}`);
console.log(`Revenue: ${revenue}`);
console.log(`Unpaid ids: ${unpaidIds.join(", ")}`);
console.log(`Customers: ${customers.join(", ")}`);
console.log(`Biggest: order ${biggest.id} (${biggest.customer})`);
