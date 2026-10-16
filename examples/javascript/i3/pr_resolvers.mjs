const { promise, resolve } = Promise.withResolvers();

promise.then((value) => console.log("A got", value));
promise.then((value) => console.log("B got", value));

setTimeout(() => resolve("data"), 10);
setTimeout(() => resolve("ignored"), 20);
