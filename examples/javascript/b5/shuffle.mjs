function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

const cards = [1, 2, 3, 4, 5];
const mixed = shuffled(cards);
console.log(mixed.length, cards);
console.log([...mixed].sort((a, b) => a - b));
