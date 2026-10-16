function* ids(prefix) {
  let n = 1;
  while (true) {
    yield `${prefix}-${n}`;
    n += 1;
  }
}

const orderIds = ids("order");
console.log(orderIds.next().value, orderIds.next().value);

for (const id of orderIds) {
  console.log(id);
  if (id.endsWith("4")) {
    break;
  }
}

console.log(orderIds.next());
