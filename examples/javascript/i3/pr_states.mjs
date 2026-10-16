const pending = new Promise((resolve) => {
  setTimeout(resolve, 10, "ready");
});
console.log(pending);
await pending;
console.log(pending);

console.log(Promise.resolve(42));
const rejected = Promise.reject(new Error("nope"));
rejected.catch((error) => console.log("caught", error.message));
