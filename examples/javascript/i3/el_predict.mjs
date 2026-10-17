console.log("A");
setTimeout(() => {
  console.log("B");
  queueMicrotask(() => console.log("C"));
}, 0);
setTimeout(() => console.log("D"), 5);
Promise.resolve()
  .then(() => console.log("E"))
  .then(() => console.log("F"));
queueMicrotask(() => console.log("G"));
console.log("H");
