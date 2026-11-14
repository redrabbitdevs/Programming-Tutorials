const book: { title: string; pages: number; isbn?: string } = {
  title: "Dune",
  pages: 412,
};

function describe(item: { title: string; pages: number }): string {
  return `${item.title} (${item.pages} pages)`;
}

console.log(describe(book));
console.log(book.isbn?.length);
