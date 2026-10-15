import { countDone, toggleTask } from "./tasks_logic.js";

const tasks = [
  { id: 1, text: "Write HTML", done: false },
  { id: 2, text: "Write JavaScript", done: true },
];

const after = toggleTask(tasks, 1);
console.log(after);
console.log(countDone(tasks), countDone(after));
console.log(toggleTask(tasks, 99) === tasks, toggleTask(tasks, 99).length);
