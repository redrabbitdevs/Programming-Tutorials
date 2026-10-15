import { labelFor } from "./fruit_labels.js";

const fruits = ["apple", "banana", "cherry"];
const list = document.querySelector("#fruit");

const rows = fruits.map((name, index) => {
  const li = document.createElement("li");
  li.textContent = labelFor(name, index);
  return li;
});

list.replaceChildren(...rows);
