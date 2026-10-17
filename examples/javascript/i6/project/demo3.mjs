// @ts-check
import { createClient } from "./src/client.mjs";
import { startApi } from "./support/api.mjs";

const api = await startApi();
const client = createClient({
  baseUrl: api.url,
  baseDelayMs: 5,
  onRetry: ({ delay, error }) => console.log(`retry in ${delay} ms: ${error}`),
});

api.behavior.failures = 1;
console.log(await client.get("/users"));
console.log(await client.post("/users", { name: "Grace" }));
await api.stop();
