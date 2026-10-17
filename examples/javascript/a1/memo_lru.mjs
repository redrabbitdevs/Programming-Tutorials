function memoizeLimited(fn, limit) {
  const cache = new Map();
  return (key) => {
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    const value = fn(key);
    cache.set(key, value);
    if (cache.size > limit) {
      cache.delete(cache.keys().next().value);
    }
    console.log("computed", key, "cache:", [...cache.keys()]);
    return value;
  };
}

const double = memoizeLimited((n) => n * 2, 2);
for (const n of [1, 2, 1, 3, 2]) {
  double(n);
}
