import { validateSignup } from "./signup_rules.js";

const form = document.querySelector("#signup");
const result = document.querySelector("#result");
const touched = new Set();

function check() {
  const errors = validateSignup(Object.fromEntries(new FormData(form)));

  for (const field of form.querySelectorAll("input")) {
    const message = errors[field.name] ?? "";
    field.setCustomValidity(message);
    const output = form.querySelector(`[data-error-for="${field.name}"]`);
    output.textContent = touched.has(field.name) ? message : "";
  }

  return errors;
}

for (const field of form.querySelectorAll("input")) {
  field.addEventListener("input", () => {
    touched.add(field.name);
    check();
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (Object.keys(check()).length > 0) return;

  const { username, email } = Object.fromEntries(new FormData(form));
  result.textContent = `Welcome, ${username}! We would email ${email}.`;

  form.reset();
  touched.clear();
  check();
});

check();
