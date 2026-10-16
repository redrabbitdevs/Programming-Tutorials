let calls = 0;
const cache = new WeakMap();

function describe(shape) {
  if (cache.has(shape)) {
    return cache.get(shape);
  }
  calls += 1;
  const text = `${shape.w}x${shape.h} = ${shape.w * shape.h}`;
  cache.set(shape, text);
  return text;
}

const box = { w: 3, h: 4 };
console.log(describe(box), describe(box), calls);
console.log(describe({ w: 3, h: 4 }), calls);
