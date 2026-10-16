const user = {
  name: "Ada",
  age: 36,
  address: { city: "London", zip: "N1" },
  tags: ["admin", "dev"],
};

const { name, age } = user;
console.log(name, age);

const { name: userName, role = "guest" } = user;
console.log(userName, role);

const { address: { city }, tags: [firstTag] } = user;
console.log(city, firstTag);

const { age: _age, ...rest } = user;
console.log(rest);

const { nickname = "none", missing = 5, nothing = 7 } = {
  nickname: undefined,
  nothing: null,
};
console.log(nickname, missing, nothing);

function describe({ name, age = 0 }) {
  return `${name} (${age})`;
}
console.log(describe(user), describe({ name: "Linus" }));

let title;
({ title } = { title: "Dr" });
console.log(title);
