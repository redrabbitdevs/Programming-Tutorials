function observable(target, onChange) {
  return new Proxy(target, {
    set(obj, key, value, receiver) {
      const old = obj[key];
      const ok = Reflect.set(obj, key, value, receiver);
      if (ok && old !== value) {
        onChange(key, old, value);
      }
      return ok;
    },
  });
}

const cart = observable({ items: 0 }, (key, from, to) => {
  console.log(`${key}: ${from} -> ${to}`);
});
cart.items = 2;
cart.items = 2;
cart.items += 1;
