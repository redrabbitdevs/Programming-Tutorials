const notes = new WeakMap();
const page = { url: "/home" };

notes.set(page, "needs review");
console.log(notes.get(page), notes.has(page), notes.has({ url: "/home" }));

try {
  notes.set("/home", "oops");
} catch (error) {
  console.log(error.name);
}

console.log(notes.size, typeof notes[Symbol.iterator], typeof notes.clear);
console.log(notes.delete(page), notes.has(page));
