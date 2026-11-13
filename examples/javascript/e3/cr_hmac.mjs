import { createHmac, timingSafeEqual } from "node:crypto";

// In a real app this comes from the environment, never from the code.
const key = Buffer.from("k3y-for-the-example-only-0123456789abcdef");

const mac = (text) => createHmac("sha256", key).update(text).digest();

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${mac(body).toString("base64url")}`;
}

function verify(token) {
  const [body, signature = ""] = token.split(".");
  const given = Buffer.from(signature, "base64url");
  const expected = mac(body);
  if (given.length !== expected.length) return null;
  if (!timingSafeEqual(given, expected)) return null;
  return JSON.parse(Buffer.from(body, "base64url").toString());
}

const token = sign({ user: "ada", role: "reader" });
console.log(token);
console.log(verify(token));

// Change the role in the body and keep the old signature.
const [, signature] = token.split(".");
const forged = Buffer.from('{"user":"ada","role":"admin"}')
  .toString("base64url");
console.log(verify(`${forged}.${signature}`));
