const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getUser = (id) => sleep(5).then(() => ({ id, name: "Ada" }));
const getOrders = () => sleep(5).then(() => [12, 30, 8]);
const fail = () => sleep(5).then(() => Promise.reject(new Error("db down")));

try {
  const user = await getUser(1);
  const orders = await getOrders(user);
  console.log(user.name, orders.length, "orders");
  await fail();
} catch (error) {
  console.log("error:", error.message);
}
