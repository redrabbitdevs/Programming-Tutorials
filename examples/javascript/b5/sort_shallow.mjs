const books = [
  { title: "B", year: 2001 },
  { title: "A", year: 1999 },
];

const copy = [...books];
copy.sort((a, b) => a.year - b.year);
console.log(books.map((b) => b.title), copy.map((b) => b.title));

copy[0].year = 1800;
console.log(books[1].year);
