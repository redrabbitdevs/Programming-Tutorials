function makeCounter(start = 0) {
  let count = start;
  return () => {
    count += 1;
    return count;
  };
}

const a = makeCounter();
const b = makeCounter(100);

console.log(a(), a(), a());
console.log(b(), b());
console.log(a());
