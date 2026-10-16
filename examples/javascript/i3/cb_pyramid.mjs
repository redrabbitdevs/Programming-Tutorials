import { getUser, getOrders, getTotal } from "./cb_helpers.mjs";

getUser(1, (error, user) => {
  if (error) return console.log("error:", error.message);
  getOrders(user, (error, orders) => {
    if (error) return console.log("error:", error.message);
    getTotal(orders, (error, total) => {
      if (error) return console.log("error:", error.message);
      console.log(user.name, "spent", total);
    });
  });
});
