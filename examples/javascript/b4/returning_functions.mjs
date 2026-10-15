function multiplier(factor) {
  return (n) => n * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5), triple(5), multiplier(10)(4));

function compose(f, g) {
  return (x) => f(g(x));
}
const addOne = (n) => n + 1;
const doubleThenAddOne = compose(addOne, double);
console.log(doubleThenAddOne(5));

function partial(fn, ...preset) {
  return (...rest) => fn(...preset, ...rest);
}
const volume = (w, h, d) => w * h * d;
const volumeOfBox2x3 = partial(volume, 2, 3);
console.log(volumeOfBox2x3(4));

const bound = volume.bind(null, 2, 3);
console.log(bound(5));
