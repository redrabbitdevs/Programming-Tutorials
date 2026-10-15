import { removeTask } from "./tasks_remove.js";

const tasks = [
  { id: 1, text: "Write HTML", done: false },
  { id: 2, text: "Write JavaScript", done: true },
];

const after = removeTask(tasks, 1);
console.log(after);
console.log(tasks.length, after.length);
console.log(removeTask(tasks, 99).length);
