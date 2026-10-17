const person = {
  first: "Grace",
  get greeting() {
    return `Hello, ${this.nickname}`;
  },
};

const naive = new Proxy(person, {
  get(obj, key) {
    return key in obj ? obj[key] : "friend";
  },
});
console.log(naive.greeting);

const correct = new Proxy(person, {
  get(obj, key, receiver) {
    return key in obj ? Reflect.get(obj, key, receiver) : "friend";
  },
});
console.log(correct.greeting);
