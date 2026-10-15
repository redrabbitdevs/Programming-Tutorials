const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log("before");
await pause(20);
console.log("after 20 ms");

const results = await Promise.all([pause(10).then(() => "a"), pause(5).then(() => "b")]);
console.log(results);
