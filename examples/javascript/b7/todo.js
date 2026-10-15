import { addTodo, remaining, removeTodo, toggleTodo, visibleTodos } from "./todo_state.js";
import { getStorage, loadTodos, saveTodos } from "./todo_storage.js";

const storage = getStorage(window);
let todos = loadTodos(storage);
let filter = "all";

const form = document.querySelector("#add-form");
const input = document.querySelector("#new-todo");
const filters = document.querySelector("#filters");
const list = document.querySelector("#todo-list");
const summary = document.querySelector("#summary");
const note = document.querySelector("#note");

function render() {
  const rows = visibleTodos(todos, filter).map((todo) => {
    const li = document.createElement("li");
    li.dataset.id = String(todo.id);
    li.classList.toggle("done", todo.done);

    const label = document.createElement("span");
    label.textContent = todo.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.dataset.role = "remove";

    li.append(label, " ", remove);
    return li;
  });
  list.replaceChildren(...rows);

  summary.textContent = `${remaining(todos)} left`;
  for (const button of filters.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  }
}

function commit(next) {
  todos = next;
  const saved = saveTodos(storage, todos);
  note.textContent = saved ? "" : "Could not save. Your list is lost when you close the page.";
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  commit(addTodo(todos, input.value));
  input.value = "";
  input.focus();
});

list.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (li === null) return;
  const id = Number(li.dataset.id);
  if (event.target.closest("button[data-role='remove']") !== null) {
    commit(removeTodo(todos, id));
  } else {
    commit(toggleTodo(todos, id));
  }
});

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (button === null) return;
  filter = button.dataset.filter;
  render();
});

render();
