const order = { id: 12345678901234567891n, quantity: 2 };

try {
  JSON.stringify(order);
} catch (error) {
  console.log(error.name, error.message);
}

function bigIntReplacer(key, value) {
  if (typeof value === "bigint") return JSON.rawJSON(value.toString());
  return value;
}

console.log(JSON.stringify(order, bigIntReplacer));
console.log(JSON.stringify({ price: JSON.rawJSON("1.10") }));
console.log(JSON.isRawJSON(JSON.rawJSON("1")));
