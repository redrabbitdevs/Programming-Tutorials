function describe(item: { title: string; pages: number }): string {
  return `${item.title} (${item.pages} pages)`;
}

const edition = { title: "Dune", pages: 412, price: 9.99 };
console.log(describe(edition));
