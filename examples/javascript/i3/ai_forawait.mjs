const sleep = (ms, value) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));

const promises = [sleep(30, "slow"), sleep(10, "fast"), "plain"];

for await (const value of promises) {
  console.log(value);
}
