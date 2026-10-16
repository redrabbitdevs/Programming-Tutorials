const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function job() {
  console.log("job: start");
  await sleep(10);
  console.log("job: resumed");
  return "result";
}

console.log("main: before");
const promise = job();
console.log("main: after the call");
console.log("main: got", await promise);
