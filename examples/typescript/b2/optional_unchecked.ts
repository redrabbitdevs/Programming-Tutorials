const book: { title: string; isbn?: string } = { title: "Dune" };

try {
  console.log(book.isbn.length);
} catch (error) {
  console.log(String(error));
}
