function moveItem(list, from, to) {
  const item = list[from];
  return list.toSpliced(from, 1).toSpliced(to, 0, item);
}

const tasks = ["write", "test", "ship", "rest"];
console.log(moveItem(tasks, 0, 2));
console.log(moveItem(tasks, 3, 0));
console.log(tasks);
