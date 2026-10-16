const sleep = (ms, value) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));
const timeout = (ms) =>
  new Promise((_, reject) => setTimeout(reject, ms, new Error("timed out")));

console.log(await Promise.race([sleep(30, "slow"), sleep(10, "fast")]));

try {
  await Promise.race([sleep(50, "late answer"), timeout(10)]);
} catch (error) {
  console.log(error.message);
}
