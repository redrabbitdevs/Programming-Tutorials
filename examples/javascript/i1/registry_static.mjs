class Registry {
  static #items = new Map();

  static {
    Registry.#items.set("home", "/");
    Registry.#items.set("about", "/about");
  }

  static get names() {
    return [...Registry.#items.keys()];
  }

  static path(name) {
    return Registry.#items.get(name);
  }
}

console.log(Registry.names);
console.log(Registry.path("about"), Registry.path("none"));
