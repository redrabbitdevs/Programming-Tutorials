import { Semaphore } from "./semaphore.mjs";

const semaphore = new Semaphore(2);
const finish = new Map();

async function task(name) {
  await semaphore.acquire();
  try {
    console.log("start", name);
    const { promise, resolve } = Promise.withResolvers();
    finish.set(name, resolve);
    await promise;
    console.log("end", name);
  } finally {
    semaphore.release();
  }
}

const settle = () => new Promise((resolve) => setImmediate(resolve));
const all = Promise.all(["a", "b", "c", "d"].map(task));
await settle();
for (const name of ["b", "a", "c", "d"]) {
  console.log(`-- finishing ${name}`);
  finish.get(name)();
  await settle();
}
await all;
