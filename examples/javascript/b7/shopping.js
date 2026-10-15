import { describeItem, isLow, sortByName } from "./shopping_logic.js";

const items = [
  { name: "pears", qty: 4 },
  { name: "apples", qty: 1 },
  { name: "milk", qty: 2 },
];

const list = document.querySelector("#shopping");
const count = document.querySelector("#count");

function render(items) {
  const rows = sortByName(items).map((item) => {
    const li = document.createElement("li");
    li.textContent = describeItem(item);
    li.classList.toggle("low", isLow(item));
    li.setAttribute("title", `${item.qty} left`);
    return li;
  });
  list.replaceChildren(...rows);
  count.textContent = `${items.length} items`;
}

render(items);

for (const li of list.querySelectorAll("li.low")) {
  li.append(" (running low)");
}
