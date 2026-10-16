const pages = [[1, 2], [3], [], [4, 5]];

console.log(Iterator.from(pages).flatMap((page) => page).toArray());
console.log(pages.values().flatMap((page) => page.map((n) => n * 2)).toArray());

try {
  Iterator.from(["ab"]).flatMap((word) => word).toArray();
} catch (error) {
  console.log(error.name);
}

console.log(
  Iterator.from(["ab"])
    .flatMap((word) => Iterator.from(word))
    .toArray(),
);
