const sleep = (ms, value) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));

const results = await Promise.all([
  sleep(30, "slow"),
  sleep(10, "fast"),
  "plain value",
]);
console.log(results);

const failing = Promise.all([
  sleep(10, "ok"),
  Promise.reject(new Error("one failed")),
  sleep(20, "also ok"),
]);
await failing.catch((error) => console.log("rejected:", error.message));
