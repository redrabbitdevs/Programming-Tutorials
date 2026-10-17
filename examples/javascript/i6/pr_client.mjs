import { setTimeout as sleep } from "node:timers/promises";

export class HttpError extends Error {
  constructor(status, body) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

const SAFE_TO_REPEAT = new Set(["GET", "HEAD", "PUT", "DELETE"]);

function isRetryable(error) {
  if (error instanceof HttpError) return error.status >= 500;
  return error.name === "TimeoutError" || error.message === "fetch failed";
}

export function createClient({
  baseUrl,
  retries = 2,
  timeoutMs = 5000,
  baseDelayMs = 100,
  wait = sleep,
  onRetry = () => {},
}) {
  async function send(url, options, signal) {
    const signals = [AbortSignal.timeout(timeoutMs)];
    if (signal) signals.push(signal);
    const combined = AbortSignal.any(signals);
    const response = await fetch(url, { ...options, signal: combined });
    const text = await response.text();
    const data = text ? JSON.parse(text) : undefined;
    if (!response.ok) throw new HttpError(response.status, data);
    return data;
  }

  async function request(method, path, { body, signal } = {}) {
    const url = new URL(path, baseUrl);
    const options = { method, headers: {} };
    if (body !== undefined) {
      options.headers["content-type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    const maxAttempts = SAFE_TO_REPEAT.has(method) ? retries + 1 : 1;

    for (let attempt = 1; ; attempt++) {
      try {
        return await send(url, options, signal);
      } catch (error) {
        if (attempt >= maxAttempts || !isRetryable(error)) throw error;
        const delay = baseDelayMs * 2 ** (attempt - 1);
        onRetry({ attempt, delay, error });
        await wait(delay, undefined, { signal });
      }
    }
  }

  return {
    get: (path, options) => request("GET", path, options),
    post: (path, body, options) => request("POST", path, { ...options, body }),
  };
}
