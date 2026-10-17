class TokenBucket {
  #tokens;
  #last;
  constructor({ capacity, perSecond, now }) {
    this.capacity = capacity;
    this.perSecond = perSecond;
    this.#tokens = capacity;
    this.#last = now;
  }
  tryTake(now) {
    const refill = ((now - this.#last) / 1000) * this.perSecond;
    this.#tokens = Math.min(this.capacity, this.#tokens + refill);
    this.#last = now;
    if (this.#tokens < 1) return false;
    this.#tokens -= 1;
    return true;
  }
}

const bucket = new TokenBucket({ capacity: 3, perSecond: 2, now: 0 });
const times = [0, 0, 0, 0, 100, 500, 600, 2000, 2000, 2000, 2000];
for (const t of times) {
  console.log(String(t).padStart(4), bucket.tryTake(t) ? "allowed" : "refused");
}
