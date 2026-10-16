import {
  addTodo,
  remaining,
  removeTodo,
  toggleTodo,
  visibleTodos,
} from "./todo_state.js";

let todos = [];
todos = addTodo(todos, "  Buy milk ");
todos = addTodo(todos, "Write lesson");
todos = addTodo(todos, "   ");
console.log(todos);

todos = toggleTodo(todos, 1);
console.log(remaining(todos));
console.log(visibleTodos(todos, "active").map((todo) => todo.text));
console.log(visibleTodos(todos, "done").map((todo) => todo.text));
console.log(visibleTodos(todos, "all").length);

todos = removeTodo(todos, 2);
console.log(todos);
