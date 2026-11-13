import { argon2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const argon2Async = promisify(argon2);
// 64 MiB of memory and 3 passes, as in the example in Node's crypto docs.
const PARAMS = { parallelism: 1, memory: 65536, passes: 3, tagLength: 32 };

async function hashPassword(password) {
  const nonce = randomBytes(16);
  const tag = await argon2Async("argon2id",
    { ...PARAMS, message: password, nonce });
  return `argon2id$${nonce.toString("base64url")}$${tag.toString("base64url")}`;
}

async function verifyPassword(password, stored) {
  const [scheme, nonce, tag] = stored.split("$");
  if (scheme !== "argon2id") return false;
  const actual = await argon2Async("argon2id",
    { ...PARAMS, message: password, nonce: Buffer.from(nonce, "base64url") });
  return timingSafeEqual(actual, Buffer.from(tag, "base64url"));
}

const stored = await hashPassword("hunter2 but longer");
console.log("parts:", stored.split("$").length);
console.log("right:", await verifyPassword("hunter2 but longer", stored));
console.log("wrong:", await verifyPassword("hunter3 but longer", stored));
