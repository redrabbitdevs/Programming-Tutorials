// Fix 1: copy before sorting (or use toSorted)
const original = [3, 1, 2];
const sortedCopy = original.toSorted();
console.log(original, sortedCopy);

// Fix 2: build a new tags array for every post
const makePost = () => ({ tags: [] });
const post1 = makePost();
const post2 = makePost();
post1.tags.push("news");
console.log(post2.tags);

// Fix 3: make a separate array for every row
const grid = Array.from({ length: 2 }, () => []);
grid[0].push("x");
console.log(grid);

// Fix 4: return a new object
function addTax(order) {
  return { ...order, total: order.total * 1.2 };
}
const order = { total: 100 };
const taxed = addTax(order);
console.log(order.total, taxed.total);

// Fix 5: copy each row too
const rows = [{ n: 2 }, { n: 1 }];
const rowsCopy = rows.map((row) => ({ ...row }));
rowsCopy[0].n = 99;
console.log(rows);
