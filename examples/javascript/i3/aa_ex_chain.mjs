const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getUser = (id) => sleep(5).then(() => ({ id, name: "Ada" }));
const getOrders = () => sleep(5).then(() => [12, 30, 8]);
const fail = () => sleep(5).then(() => Promise.reject(new Error("db down")));

getUser(1)
  .then((user) => getOrders(user).then((orders) => ({ user, orders })))
  .then(({ user, orders }) => console.log(user.name, orders.length, "orders"))
  .then(fail)
  .catch((error) => console.log("error:", error.message));
