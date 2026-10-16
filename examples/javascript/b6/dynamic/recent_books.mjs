import books from "./books.json" with { type: "json" };

const recent = books.filter((book) => book.year > 1980);
console.log(recent.map((book) => book.title));
console.log(books.length);
