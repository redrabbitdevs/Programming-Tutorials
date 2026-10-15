const book = {
  isbn: "978-0-13-468599-1",
  title: "The Pragmatic Programmer",
  authors: ["Hunt", "Thomas"],
  available: true,
};

const member = {
  name: "Ada",
  borrowed: [],
};

function lend(book, member) {
  if (!book.available) return false;
  book.available = false;
  member.borrowed.push(book.isbn);
  return true;
}

console.log(lend(book, member));
console.log(lend(book, member));
console.log(member);
console.log(Object.keys(book).length);
