import { getStorage, loadTodos, saveTodos } from "./todo_storage.js";

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

const storage = memoryStorage();
console.log(loadTodos(storage));

const todos = [{ id: 1, text: "Buy milk", done: false }];
console.log(saveTodos(storage, todos));
console.log(loadTodos(storage));

storage.setItem("todos", "{not json");
console.log(loadTodos(storage));

const mixed = [{ id: 1, text: "ok", done: true }, { id: "x" }, null];
storage.setItem("todos", JSON.stringify(mixed));
console.log(loadTodos(storage));

const full = {
  getItem: () => null,
  setItem: () => {
    throw new Error("storage is full");
  },
};
console.log(saveTodos(full, todos));

const blocked = {
  get localStorage() {
    throw new Error("access denied");
  },
};
const none = getStorage(blocked);
console.log(none, loadTodos(none), saveTodos(none, todos));
