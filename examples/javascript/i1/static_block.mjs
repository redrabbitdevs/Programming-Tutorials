class Level {
  static #names = new Map();
  static #byName = new Map();

  static {
    const names = ["debug", "info", "warn", "error"];
    for (const [number, name] of names.entries()) {
      Level.#names.set(number, name);
      Level.#byName.set(name, number);
    }
  }

  static nameOf(number) {
    return Level.#names.get(number) ?? "unknown";
  }

  static numberOf(name) {
    return Level.#byName.get(name);
  }
}

console.log(Level.nameOf(2), Level.nameOf(9), Level.numberOf("error"));
