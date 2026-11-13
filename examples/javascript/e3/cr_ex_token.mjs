import { createHmac, timingSafeEqual } from "node:crypto";

const key = Buffer.from("another-example-key-never-hard-code-me");
const mac = (text) => createHmac("sha256", key).update(text).digest();
const b64 = (text) => Buffer.from(text).toString("base64url");

// A token that carries its own expiry time, in seconds since the epoch.
function issue(claims, { now, ttl }) {
  const body = b64(JSON.stringify({ ...claims, exp: now + ttl }));
  return `${body}.${mac(body).toString("base64url")}`;
}

// The claims, or a reason why the token is not acceptable.
function check(token, { now }) {
  const parts = token.split(".");
  if (parts.length !== 2) return "malformed";
  const [body, signature] = parts;
  const given = Buffer.from(signature, "base64url");
  const expected = mac(body);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return "bad signature";
  }
  const claims = JSON.parse(Buffer.from(body, "base64url").toString());
  return claims.exp > now ? claims : "expired";
}

const now = 1_800_000_000; // a fixed clock keeps the output stable
const token = issue({ user: "ada" }, { now, ttl: 900 });
console.log(check(token, { now: now + 60 }));
console.log(check(token, { now: now + 901 }));
const longer = b64(JSON.stringify({ user: "ada", exp: now + 99_999 }));
console.log(check(`${longer}.${token.split(".")[1]}`, { now }));
console.log(check("not-a-token", { now }));
