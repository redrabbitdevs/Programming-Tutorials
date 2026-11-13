import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const COST = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

// Store "scrypt$N$r$p$salt$hash" so the parameters travel with the hash.
async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 32, COST);
  const { N, r, p } = COST;
  return ["scrypt", N, r, p, salt.toString("base64url"),
    hash.toString("base64url")].join("$");
}

async function verifyPassword(password, stored) {
  const [scheme, N, r, p, salt, hash] = stored.split("$");
  if (scheme !== "scrypt") return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = await scryptAsync(password, Buffer.from(salt, "base64url"),
    expected.length, { N: +N, r: +r, p: +p, maxmem: COST.maxmem });
  return timingSafeEqual(actual, expected);
}

const stored = await hashPassword("correct horse battery staple");
console.log(stored.split("$").slice(0, 4).join("$"), "...");
console.log("right password:",
  await verifyPassword("correct horse battery staple", stored));
console.log("wrong password:", await verifyPassword("Tr0ub4dor&3", stored));
const again = await hashPassword("correct horse battery staple");
console.log("same password, same hash:", again === stored);
