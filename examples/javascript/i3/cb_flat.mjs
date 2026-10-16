import { getUser, getOrders, getTotal } from "./cb_helpers.mjs";

function showTotal(user) {
  return (error, total) => {
    if (error) return console.log("error:", error.message);
    console.log(user.name, "spent", total);
  };
}

function onOrders(user) {
  return (error, orders) => {
    if (error) return console.log("error:", error.message);
    getTotal(orders, showTotal(user));
  };
}

getUser(1, (error, user) => {
  if (error) return console.log("error:", error.message);
  getOrders(user, onOrders(user));
});
