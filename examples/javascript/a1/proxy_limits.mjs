class Account {
  #balance = 100;
  get balance() {
    return this.#balance;
  }
}

const viaProxy = new Proxy(new Account(), {});
try {
  console.log(viaProxy.balance);
} catch (error) {
  console.log(error.name);
}

const plain = new Proxy(new Map([["a", 1]]), {});
try {
  console.log(plain.get("a"));
} catch (error) {
  console.log(error.name);
}

const bound = new Proxy(new Map([["a", 1]]), {
  get(map, key) {
    const value = Reflect.get(map, key, map);
    return typeof value === "function" ? value.bind(map) : value;
  },
});
console.log(bound.get("a"), bound.size);
