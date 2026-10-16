const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* countdown(from) {
  for (let n = from; n > 0; n--) {
    await sleep(5);
    yield n;
  }
  return "liftoff";
}

for await (const n of countdown(3)) {
  console.log(n);
}
console.log("after the loop");

const manual = countdown(1);
console.log(await manual.next());
console.log(await manual.next());
