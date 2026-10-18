import { setTimeout as sleep } from "node:timers/promises";

async function retry(fn, options = {}) {
  const { attempts = 3, base = 10, random = Math.random, signal } = options;
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      if (attempt >= attempts || signal?.aborted) throw error;
      const ceiling = base * 2 ** (attempt - 1);
      const delay = Math.round(ceiling / 2 + random() * (ceiling / 2));
      console.log(`attempt ${attempt}: ${error.message}, wait ${delay} ms`);
      await sleep(delay, undefined, { signal });
    }
  }
}

async function flaky(attempt) {
  if (attempt < 3) throw new Error("503 busy");
  return `ok on attempt ${attempt}`;
}

const fixed = { random: () => 1 };
console.log(await retry(flaky, fixed));

try {
  await retry(flaky, { ...fixed, attempts: 2 });
} catch (error) {
  console.log("gave up:", error.message);
}
