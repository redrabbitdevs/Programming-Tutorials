import { countDone, toggleTask } from "./tasks_logic.js";

let tasks = [
  { id: 1, text: "Write HTML", done: false },
  { id: 2, text: "Write JavaScript", done: false },
  { id: 3, text: "Open the page", done: false },
];

const list = document.querySelector("#tasks");
const summary = document.querySelector("#summary");
const status = document.querySelector("#status");

function render() {
  const rows = tasks.map((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = String(task.id);
    li.classList.toggle("done", task.done);
    return li;
  });
  list.replaceChildren(...rows);
  summary.textContent = `${countDone(tasks)} of ${tasks.length} done.`;
}

list.addEventListener("click", (event) => {
  console.log(event.type, event.target.tagName, event.currentTarget.id);
  const li = event.target.closest("li");
  if (li === null || !list.contains(li)) return;
  tasks = toggleTask(tasks, Number(li.dataset.id));
  render();
});

document.querySelector("#docs").addEventListener("click", (event) => {
  event.preventDefault();
  status.textContent = "The link click was cancelled. The page stayed where it is.";
});

render();
