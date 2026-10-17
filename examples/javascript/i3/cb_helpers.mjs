export function getUser(id, callback) {
  setTimeout(() => callback(null, { id, name: "Ada" }), 5);
}

export function getOrders(user, callback) {
  setTimeout(() => callback(null, [12, 30, 8]), 5);
}

export function getTotal(orders, callback) {
  const total = orders.reduce((sum, amount) => sum + amount, 0);
  setTimeout(() => callback(null, total), 5);
}
