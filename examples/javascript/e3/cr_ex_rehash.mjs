import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const MAXMEM = 128 * 1024 * 1024;
const CURRENT_N = 2 ** 15;

async function hashPassword(password, N = CURRENT_N) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 32, { N, maxmem: MAXMEM });
  return `scrypt$${N}$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

// Verify, and say whether the stored hash uses an outdated cost.
async function verify(password, stored) {
  const [, n, salt, hash] = stored.split("$");
  const expected = Buffer.from(hash, "base64url");
  const actual = await scryptAsync(password, Buffer.from(salt, "base64url"),
    expected.length, { N: Number(n), maxmem: MAXMEM });
  return { ok: timingSafeEqual(actual, expected), stale: Number(n) < CURRENT_N };
}

// On a successful login, upgrade an outdated hash in place.
async function login(users, name, password) {
  const result = await verify(password, users.get(name));
  if (result.ok && result.stale) {
    users.set(name, await hashPassword(password));
  }
  return result.ok;
}

const users = new Map([["ada", await hashPassword("pa55-phrase", 2 ** 12)]]);
const cost = () => users.get("ada").split("$")[1];
console.log("stored cost:", cost());
console.log("wrong password:", await login(users, "ada", "nope"), cost());
console.log("right password:", await login(users, "ada", "pa55-phrase"), cost());
console.log("still works:", await login(users, "ada", "pa55-phrase"));
