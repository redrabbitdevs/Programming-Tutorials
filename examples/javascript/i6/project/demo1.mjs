// @ts-check
import { send } from "./src/send.mjs";
import { HttpError } from "./src/errors.mjs";
import { startApi } from "./support/api.mjs";

const api = await startApi();
const limits = { timeoutMs: 1000 };

console.log(await send(new URL("/users/1", api.url), {}, limits));
try {
  await send(new URL("/users/99", api.url), {}, limits);
} catch (error) {
  if (error instanceof HttpError) console.log(error.status, error.body);
}
await api.stop();
