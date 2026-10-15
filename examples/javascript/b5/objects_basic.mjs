const user = {
  name: "Ada",
  age: 36,
  "favourite colour": "green",
  skills: ["maths", "code"],
};

console.log(user.name, user["age"]);
console.log(user["favourite colour"]);
console.log(user.email);

const field = "name";
console.log(user[field]);

user.email = "ada@example.com";
user.age = 37;
console.log(user);

delete user.email;
console.log(user.email, "email" in user);

const name = "Grace";
const age = 85;
const shorthand = { name, age };
console.log(shorthand);

const key = "level";
const dynamic = { [key]: 3, [`${key}Max`]: 10 };
console.log(dynamic);
