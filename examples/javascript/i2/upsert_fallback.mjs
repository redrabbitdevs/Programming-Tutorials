function getOrInsertComputed(map, key, create) {
  if (!map.has(key)) {
    map.set(key, create(key));
  }
  return map.get(key);
}

const index = new Map();
for (const word of ["ant", "bee", "ape"]) {
  getOrInsertComputed(index, word[0], () => []).push(word);
}
console.log(index);
