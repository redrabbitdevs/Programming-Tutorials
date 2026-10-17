class Volume {
  #level = 5;

  get level() {
    return this.#level;
  }
  set level(value) {
    this.#level = Math.min(10, Math.max(0, value));
  }
}

const v = new Volume();
v.level = 42;
console.log(v.level);
v.level = -3;
console.log(v.level, Object.keys(v));
