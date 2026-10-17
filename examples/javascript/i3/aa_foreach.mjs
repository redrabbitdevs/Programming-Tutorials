const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delays = [30, 20, 10];

delays.forEach(async (ms) => {
  await sleep(ms);
  console.log("forEach item done", ms);
});
console.log("after forEach");

await sleep(50);
for (const ms of delays) {
  await sleep(ms);
  console.log("for-of item done", ms);
}
console.log("after for-of");
