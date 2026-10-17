// @ts-check
import { HttpError } from "./errors.mjs";

/**
 * One attempt: JSON in and out, a timeout, and the caller's signal.
 * @param {URL} url
 * @param {RequestInit} options
 * @param {{ timeoutMs: number, signal?: AbortSignal }} limits
 * @returns {Promise<unknown>}
 */
export async function send(url, options, { timeoutMs, signal }) {
  const signals = [AbortSignal.timeout(timeoutMs)];
  if (signal) signals.push(signal);
  const combined = AbortSignal.any(signals);
  const response = await fetch(url, { ...options, signal: combined });
  const text = await response.text();
  const data = text ? JSON.parse(text) : undefined;
  if (!response.ok) throw new HttpError(response.status, data);
  return data;
}
