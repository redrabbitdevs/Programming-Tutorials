import { clearDone } from "./clear_done.js";

const todos = [
  { id: 1, text: "Buy milk", done: true },
  { id: 2, text: "Write lesson", done: false },
  { id: 3, text: "Water plants", done: true },
];

console.log(clearDone(todos));
console.log(todos.length);
console.log(clearDone([]));
