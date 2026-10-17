// @ts-check
import { send } from "./src/send.mjs";
import { withRetries } from "./src/retry.mjs";
import { startApi } from "./support/api.mjs";

const api = await startApi();
api.behavior.failures = 2;

const url = new URL("/users/2", api.url);
const attempt = () => send(url, {}, { timeoutMs: 1000 });
const user = await withRetries(attempt, {
  maxAttempts: 3,
  baseDelayMs: 5,
  onRetry: ({ attempt, delay }) => {
    console.log(`retry ${attempt} in ${delay} ms`);
  },
});
console.log(user);
await api.stop();
