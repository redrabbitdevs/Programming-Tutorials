const text = '[{"id":9007199254740993,"user":"ada"},{"id":42,"user":"bob"}]';

const reviver = (key, value, { source }) =>
  key === "id" ? BigInt(source) : value;
const replacer = (key, value) =>
  typeof value === "bigint" ? JSON.rawJSON(String(value)) : value;

const users = JSON.parse(text, reviver);
for (const user of users) user.id += 1n;

console.log(users.map((user) => typeof user.id).join(" "));
console.log(JSON.stringify(users, replacer));
