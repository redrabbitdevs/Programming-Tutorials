const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(task, { tries = 3, delay = 5 } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await task(attempt);
    } catch (error) {
      if (attempt === tries) {
        throw new Error(`gave up after ${tries} tries`, { cause: error });
      }
      console.log(`attempt ${attempt} failed: ${error.message}`);
      console.log(`  waiting ${delay} ms`);
      await sleep(delay);
      delay *= 2;
    }
  }
}

const flaky = async (attempt) => {
  if (attempt < 3) throw new Error(`glitch ${attempt}`);
  return `worked on attempt ${attempt}`;
};
console.log(await retry(flaky));

const down = async () => {
  throw new Error("server down");
};
try {
  await retry(down, { tries: 2 });
} catch (error) {
  console.log(error.message, "<-", error.cause.message);
}
