import { randomBytes, randomInt } from "node:crypto";

// Web Crypto: the same calls work in browsers, Deno and Bun.
const id = crypto.randomUUID();
console.log("UUID v4 shape:", /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/
  .test(id));

const bytes = crypto.getRandomValues(new Uint8Array(16));
console.log("16 random bytes:", bytes.length);

// node:crypto adds conveniences on top.
const token = randomBytes(32).toString("base64url");
console.log("session token characters:", token.length);
const pin = String(randomInt(0, 1_000_000)).padStart(6, "0");
console.log("six-digit code:", /^\d{6}$/.test(pin));
