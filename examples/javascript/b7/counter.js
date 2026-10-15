import { nextCount } from "./counter_logic.js";

let count = 0;
const output = document.querySelector("#count");
const status = document.querySelector("#status");
const controller = new AbortController();

function update(action) {
  count = nextCount(count, action);
  output.textContent = String(count);
}

for (const button of document.querySelectorAll("button[data-action]")) {
  button.addEventListener(
    "click",
    () => update(button.getAttribute("data-action")),
    { signal: controller.signal },
  );
}

document.querySelector("#hello").addEventListener(
  "click",
  () => {
    status.textContent = "Hello! This message appears only once.";
  },
  { once: true },
);

document.querySelector("#stop").addEventListener("click", () => {
  controller.abort();
  status.textContent = "The counter buttons are switched off.";
});
