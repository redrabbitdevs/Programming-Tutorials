const pipe = (...fns) => (input) => fns.reduce((value, fn) => fn(value), input);

const orders = [
  { id: 1, status: "paid", total: 40 },
  { id: 2, status: "open", total: 15 },
  { id: 3, status: "paid", total: 25 },
];

const paidRevenue = pipe(
  (list) => list.filter((order) => order.status === "paid"),
  (list) => list.map((order) => order.total),
  (totals) => totals.reduce((sum, n) => sum + n, 0),
);
console.log(paidRevenue(orders));
