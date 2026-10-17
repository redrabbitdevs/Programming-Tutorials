// @ts-check
import { send } from "./send.mjs";
import { withRetries } from "./retry.mjs";

const SAFE_TO_REPEAT = new Set(["GET", "HEAD", "PUT", "DELETE"]);

/**
 * @typedef {import("./retry.mjs").RetryPolicy} RetryPolicy
 * @typedef {object} ClientOptions
 * @property {string} baseUrl
 * @property {number} [retries] retries after the first attempt (default 2)
 * @property {number} [timeoutMs] limit for each attempt (default 5000)
 * @property {number} [baseDelayMs] first back-off delay (default 100)
 * @property {RetryPolicy["wait"]} [wait]
 * @property {RetryPolicy["onRetry"]} [onRetry]
 */

/** @param {ClientOptions} options */
export function createClient(options) {
  const { baseUrl, retries = 2, timeoutMs = 5000, baseDelayMs = 100 } = options;

  /**
   * @param {string} method
   * @param {string} path
   * @param {{ body?: unknown, signal?: AbortSignal }} [extra]
   */
  async function request(method, path, { body, signal } = {}) {
    const url = new URL(path, baseUrl);
    /** @type {RequestInit} */
    const init = { method };
    if (body !== undefined) {
      init.headers = { "content-type": "application/json" };
      init.body = JSON.stringify(body);
    }
    const maxAttempts = SAFE_TO_REPEAT.has(method) ? retries + 1 : 1;
    const policy = { ...options, maxAttempts, baseDelayMs, signal };
    return withRetries(() => send(url, init, { timeoutMs, signal }), policy);
  }

  /** @typedef {{ signal?: AbortSignal }} Extra */
  return {
    /** @param {string} path @param {Extra} [extra] */
    get: (path, extra) => request("GET", path, extra),
    /**
     * @param {string} path
     * @param {unknown} body
     * @param {Extra} [extra]
     */
    post: (path, body, extra) => request("POST", path, { ...extra, body }),
  };
}
