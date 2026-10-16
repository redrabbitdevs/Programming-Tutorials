const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function task(name, ms) {
  console.log("start", name);
  await sleep(ms);
  console.log("end", name);
  return name.toUpperCase();
}

console.log("-- one after the other");
const a1 = await task("a", 30);
const b1 = await task("b", 10);
console.log(a1, b1);

console.log("-- both at once");
const pa = task("a", 30);
const pb = task("b", 10);
console.log(await pa, await pb);
