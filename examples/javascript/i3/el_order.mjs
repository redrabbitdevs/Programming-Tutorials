console.log("1 sync start");
setTimeout(() => console.log("5 timer, 0 ms"), 0);
Promise.resolve().then(() => console.log("3 promise callback"));
queueMicrotask(() => console.log("4 microtask"));
console.log("2 sync end");
