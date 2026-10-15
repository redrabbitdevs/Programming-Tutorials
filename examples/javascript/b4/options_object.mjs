function createUser(name, { admin = false, active = true } = {}) {
  return { name, admin, active };
}

console.log(createUser("ada"));
console.log(createUser("grace", { admin: true }));
console.log(createUser("linus", { active: false, admin: true }));
