const target = { name: "Ada" };

const withDefault = new Proxy(target, {
  get(obj, key) {
    return key in obj ? obj[key] : "(none)";
  },
});

console.log(withDefault.name, withDefault.email);
console.log(target.email);

withDefault.email = "ada@example.com";
console.log(target.email, withDefault === target);
