const users = Array.from({ length: 20_000 }, (_, i) => ({
  id: `u${i}`,
  name: `User ${i}`,
}));
const orders = Array.from({ length: 2_000 }, (_, i) => ({
  id: i,
  userId: `u${(i * 7919) % 20_000}`,
  total: (i % 50) + 0.5,
}));

const usersById = new Map(users.map((user) => [user.id, user]));

function handleOrdersRequest() {
  const rows = orders.map((o) =>
    ({ ...o, user: usersById.get(o.userId).name }));
  return JSON.stringify(rows);
}

let bytes = 0;
for (let i = 0; i < 10; i++) bytes += handleOrdersRequest().length;
console.log("served 10 requests,", bytes, "bytes");
