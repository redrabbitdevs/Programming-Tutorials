const todos = [];

function addTodo(text) {
  todos.push({ text, done: false });
}

function complete(text) {
  const todo = todos.find((t) => t.text === text);
  if (todo) todo.done = true;
}

function removeDone() {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].done) todos.splice(i, 1);
  }
}

addTodo("buy milk");
addTodo("write lesson");
addTodo("call Ada");
complete("buy milk");
complete("call Ada");
removeDone();
console.log(todos);
