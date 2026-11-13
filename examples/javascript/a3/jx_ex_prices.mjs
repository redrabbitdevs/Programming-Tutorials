const text =
  '{"items":[{"sku":"A1","price":19.90},{"sku":"B2","price":5.00}]}';

const list = JSON.parse(text, (key, value, { source }) =>
  key === "price" ? source : value,
);
console.log(list.items.map((item) => item.price));

const out = JSON.stringify(list, (key, value) =>
  key === "price" ? JSON.rawJSON(value) : value,
);
console.log(out === text);
