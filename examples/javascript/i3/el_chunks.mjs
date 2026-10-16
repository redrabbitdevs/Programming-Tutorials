setImmediate(() => console.log("other task"));

function work(from) {
  console.log("chunk starting at", from);
  if (from < 4) {
    setImmediate(() => work(from + 2));
  }
}
work(0);
