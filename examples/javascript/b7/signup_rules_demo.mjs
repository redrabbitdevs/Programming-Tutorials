import { validateSignup } from "./signup_rules.js";

console.log(
  validateSignup({
    username: "ada",
    email: "ada@example.com",
    password: "analytical",
    confirm: "analytical",
  }),
);

console.log(
  validateSignup({
    username: "a b",
    email: "ada@",
    password: "short",
    confirm: "other",
  }),
);

console.log(validateSignup({}));
