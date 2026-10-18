class Lock {
  #held = false;
  get held() {
    return this.#held;
  }
  acquire() {
    if (this.#held) throw new Error("already locked");
    this.#held = true;
    return {
      [Symbol.dispose]: () => {
        this.#held = false;
      },
    };
  }
}

const lock = new Lock();
{
  using guard = lock.acquire();
  console.log("inside:", lock.held);
  try {
    lock.acquire();
  } catch (error) {
    console.log("second acquire:", error.message);
  }
}
console.log("after block:", lock.held);

try {
  using guard = lock.acquire();
  throw new Error("task crashed");
} catch (error) {
  console.log(error.message, "- held:", lock.held);
}
