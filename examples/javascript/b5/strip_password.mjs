function withoutPassword({ password, ...safe }) {
  return safe;
}

const account = { name: "Ada", email: "ada@example.com", password: "secret" };
console.log(withoutPassword(account));
console.log(account);
