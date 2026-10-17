const sleep = (ms, value) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(reject, ms, new Error(`timed out after ${ms} ms`));
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

console.log(await withTimeout(sleep(5, "fast enough"), 50));
try {
  await withTimeout(sleep(100, "too slow"), 10);
} catch (error) {
  console.log(error.message);
}
