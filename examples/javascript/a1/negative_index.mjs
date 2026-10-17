function withNegativeIndex(array) {
  return new Proxy(array, {
    get(target, key, receiver) {
      if (typeof key === "string" && /^-\d+$/.test(key)) {
        return target[target.length + Number(key)];
      }
      return Reflect.get(target, key, receiver);
    },
  });
}

const letters = withNegativeIndex(["a", "b", "c", "d"]);
console.log(letters[-1], letters[-4], letters[-5], letters[0]);
console.log(letters.length, letters.map((s) => s.toUpperCase()));
