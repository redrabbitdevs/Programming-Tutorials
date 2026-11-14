const book: { title: string; author: string; year: number } = {
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
};

const member: { name: string; borrowed: string[] } = {
  name: "Ada",
  borrowed: [book.title],
};

const extra: { title: string; author: string; year: number } = {
  title: "Emma",
  author: "Jane Austen",
  year: 1815,
  // @ts-expect-error: pages is not part of the type
  pages: 474,
};

console.log(member.name, member.borrowed, extra.title);
