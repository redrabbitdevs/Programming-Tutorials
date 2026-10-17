function randomInt(min, max, random = Math.random) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i, random);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const seen = new Set();
for (let i = 0; i < 1000; i++) seen.add(randomInt(1, 6));
console.log([...seen].sort());

const deck = shuffle([1, 2, 3, 4, 5]);
console.log(deck.length, [...deck].sort());
console.log(shuffle([1, 2, 3], () => 0));
