const id = Symbol("id");
const user = { name: "Ada", [id]: 42 };

console.log(user[id], user.id);
console.log(Object.keys(user), JSON.stringify(user));
console.log(Object.getOwnPropertySymbols(user));
console.log(user);

for (const key in user) {
  console.log("for...in:", key);
}

const copy = { ...user };
console.log(copy[id]);
