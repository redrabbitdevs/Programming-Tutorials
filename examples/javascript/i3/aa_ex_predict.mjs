async function job() {
  console.log("A");
  await null;
  console.log("B");
}

console.log("C");
setTimeout(() => console.log("D"), 0);
Promise.resolve()
  .then(() => console.log("E"))
  .then(() => console.log("F"));
job();
console.log("G");
queueMicrotask(() => console.log("H"));
