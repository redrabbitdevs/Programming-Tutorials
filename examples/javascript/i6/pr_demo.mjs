import { createClient, HttpError } from "./pr_client.mjs";
import { startApi } from "./pr_server.mjs";

const api = await startApi();
const client = createClient({
  baseUrl: api.url,
  baseDelayMs: 5,
  onRetry: ({ delay, error }) =>
    console.log(`retry in ${delay} ms: ${error.message}`),
});

api.behavior.failures = 1;
console.log(await client.get("/users"));
console.log(await client.post("/users", { name: "Grace" }));

try {
  await client.get("/users/99");
} catch (error) {
  console.log(error instanceof HttpError, error.status, error.body);
}
await api.stop();
