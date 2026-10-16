import { validateSignup } from "./signup_rules.js";

function handleSignup(body) {
  const fields = Object.keys(validateSignup(body));
  if (fields.length === 0) return "accepted";
  return `rejected: ${fields.join(", ")}`;
}

const good = {
  username: "ada",
  email: "ada@example.com",
  password: "analytical",
  confirm: "analytical",
};
const sneaky = { ...good, username: "x", password: "short", confirm: "short" };

console.log(handleSignup(good));
console.log(handleSignup(sneaky));
