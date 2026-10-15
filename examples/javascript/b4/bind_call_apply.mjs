function introduce(greeting, punctuation) {
  return `${greeting}, I am ${this.name}${punctuation}`;
}

const ada = { name: "Ada" };

console.log(introduce.call(ada, "Hello", "!"));
console.log(introduce.apply(ada, ["Hi", "?"]));

const adaSays = introduce.bind(ada, "Hey");
console.log(adaSays("."));
