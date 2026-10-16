const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ticker = {
  last: 3,
  [Symbol.asyncIterator]() {
    let n = 1;
    const last = this.last;
    return {
      async next() {
        await sleep(5);
        if (n > last) return { value: undefined, done: true };
        return { value: n++, done: false };
      },
    };
  },
};

for await (const n of ticker) {
  console.log("tick", n);
}
