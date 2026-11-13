const text = '{"id": 12345678901234567891, "price": 1.10}';
const order = JSON.parse(text);

console.log(order.id);
console.log(Number.isSafeInteger(order.id));
console.log(order.price);
