const pick = (items, random = Math.random) =>
  items[Math.floor(random() * items.length)];

console.log(pick(["a", "b", "c"], () => 0));
console.log(pick(["a", "b", "c"], () => 0.99));
const bytes = crypto.getRandomValues(new Uint8Array(4));
console.log(crypto.randomUUID().length, bytes.length);
