const user = { name: "Ada", role: "admin" };

try {
  for (const item of user) {
    console.log(item);
  }
} catch (error) {
  console.log(error.name);
}

try {
  console.log([...user]);
} catch (error) {
  console.log(error.name);
}

console.log([...Object.entries(user)]);
