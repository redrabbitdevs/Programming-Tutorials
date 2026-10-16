const text =
  '{"name":"Ada","age":36,"tags":["maths","code"],' +
  '"address":null,"active":true}';

const data = JSON.parse(text);
console.log(data.name, data.tags[1], data.address, typeof data.age);

const user = { name: "Ada", tags: ["maths", "code"], active: true };
console.log(JSON.stringify(user));
console.log(JSON.stringify(user, null, 2));
console.log(JSON.stringify(user, null, "--"));

console.log(JSON.stringify("hi"), JSON.stringify(42), JSON.stringify(null));

try {
  JSON.parse("{'name': 'Ada'}");
} catch (error) {
  console.log(error.name);
}

try {
  JSON.parse("");
} catch (error) {
  console.log(error instanceof SyntaxError);
}
