const pages = [[1, 2], [3, 4, 5], [6]];

const items = () => pages.values().flatMap((page) => page);

console.log(items().toArray());
console.log(items().drop(1).take(3).toArray());
console.log(items().some((n) => n > 5), items().every((n) => n < 6));
console.log(items().find((n) => n % 4 === 0));
console.log(items().reduce((sum, n) => sum + n));
