export function clearDone(todos) {
  return todos.filter((todo) => !todo.done);
}
