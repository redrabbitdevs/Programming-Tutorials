// @ts-check
import { setTimeout as sleep } from "node:timers/promises";
import { HttpError } from "./errors.mjs";

/**
 * @typedef {{ signal?: AbortSignal }} WaitOptions
 * @typedef {{ attempt: number, delay: number, error: unknown }} RetryInfo
 * @typedef {object} RetryPolicy
 * @property {number} maxAttempts
 * @property {number} baseDelayMs
 * @property {AbortSignal} [signal]
 * @property {(ms: number, o: WaitOptions) => Promise<unknown>} [wait]
 * @property {(info: RetryInfo) => void} [onRetry]
 */

/** @param {unknown} error */
export function isRetryable(error) {
  if (error instanceof HttpError) return error.status >= 500;
  if (!(error instanceof Error)) return false;
  return error.name === "TimeoutError" || error.message === "fetch failed";
}

/**
 * Run `attempt` again after a retryable failure, waiting longer each time.
 * @template T
 * @param {() => Promise<T>} attempt
 * @param {RetryPolicy} policy
 * @returns {Promise<T>}
 */
export async function withRetries(attempt, policy) {
  const { maxAttempts, baseDelayMs, signal, onRetry } = policy;
  const wait = policy.wait ?? ((ms, o) => sleep(ms, undefined, o));
  for (let n = 1; ; n++) {
    try {
      return await attempt();
    } catch (error) {
      if (n >= maxAttempts || !isRetryable(error)) throw error;
      const delay = baseDelayMs * 2 ** (n - 1);
      onRetry?.({ attempt: n, delay, error });
      await wait(delay, { signal });
    }
  }
}
