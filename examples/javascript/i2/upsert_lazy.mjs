let created = 0;
const makeList = () => {
  created += 1;
  return [];
};

const eager = new Map();
for (const word of ["ant", "bee", "ape"]) {
  eager.getOrInsert(word[0], makeList()).push(word);
}
console.log(created);

created = 0;
const lazy = new Map();
for (const word of ["ant", "bee", "ape"]) {
  lazy.getOrInsertComputed(word[0], makeList).push(word);
}
console.log(created, lazy);
