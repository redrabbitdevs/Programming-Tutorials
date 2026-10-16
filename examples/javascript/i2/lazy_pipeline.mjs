function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

function* filter(iterable, test) {
  for (const item of iterable) {
    if (test(item)) {
      yield item;
    }
  }
}

function* map(iterable, fn) {
  for (const item of iterable) {
    yield fn(item);
  }
}

function* take(iterable, count) {
  if (count <= 0) {
    return;
  }
  for (const item of iterable) {
    yield item;
    count -= 1;
    if (count === 0) {
      return;
    }
  }
}

const odd = filter(naturals(), (n) => n % 2 === 1);
const squares = map(odd, (n) => n * n);
console.log([...take(squares, 4)]);
