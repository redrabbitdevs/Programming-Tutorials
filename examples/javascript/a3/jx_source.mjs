const text = '{"id": 12345678901234567891, "price": 1.10, "tags": ["a", null]}';

JSON.parse(text, (key, value, context) => {
  console.log(JSON.stringify(key), value, context);
  return value;
});

function bigIntReviver(key, value, { source }) {
  const isInteger = typeof value === "number" && /^-?\d+$/.test(source);
  if (isInteger && !Number.isSafeInteger(value)) return BigInt(source);
  return value;
}

const order = JSON.parse(text, bigIntReviver);
console.log(order.id, typeof order.id);
