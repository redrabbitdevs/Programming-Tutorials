function score(word) {
  let total = 0;
  for (const ch of word) total += ch.charCodeAt(0) - 96;
  return total;
}

const words = ["apple", "banana", "cherry", "damson"];
let sum = 0;
for (let i = 0; i < 200_000; i++) sum += score(words[i % 4]);
console.log("sum:", sum);
