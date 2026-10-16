export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  );
}

export function countDone(tasks) {
  return tasks.filter((task) => task.done).length;
}
