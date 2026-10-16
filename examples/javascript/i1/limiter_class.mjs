class Limiter {
  #max;
  #used = 0;

  constructor(max) {
    this.#max = max;
  }

  tryUse() {
    if (this.#used >= this.#max) {
      return false;
    }
    this.#used += 1;
    return true;
  }

  get remaining() {
    return this.#max - this.#used;
  }
}

const limiter = new Limiter(2);
console.log(limiter.tryUse(), limiter.tryUse(), limiter.tryUse());
console.log(limiter.remaining, limiter.used, Object.keys(limiter));
