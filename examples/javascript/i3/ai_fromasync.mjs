const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* numbers() {
  for (let i = 1; i <= 3; i++) {
    await sleep(5);
    yield i;
  }
}

console.log(await Array.fromAsync(numbers()));
console.log(await Array.fromAsync(numbers(), (n) => n * 10));
console.log(await Array.fromAsync([Promise.resolve("a"), "b"]));
