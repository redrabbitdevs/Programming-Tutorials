function counted(fn) {
  let calls = 0;
  const proxy = new Proxy(fn, {
    apply(target, thisArg, args) {
      calls += 1;
      return Reflect.apply(target, thisArg, args);
    },
  });
  return { proxy, count: () => calls };
}

const { proxy: max, count } = counted(Math.max);
console.log(max(3, 9, 4), max(1), count());
console.log(max.name, max.length);
