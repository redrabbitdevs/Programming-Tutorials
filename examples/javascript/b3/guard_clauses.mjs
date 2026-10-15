function shippingCost(order) {
  if (order === null || order === undefined) {
    return 0;
  }
  if (order.items.length === 0) {
    return 0;
  }
  if (order.total >= 50) {
    return 0;
  }
  return 4.99;
}

console.log(shippingCost(null));
console.log(shippingCost({ items: [], total: 0 }));
console.log(shippingCost({ items: ["book"], total: 60 }));
console.log(shippingCost({ items: ["pen"], total: 3 }));
