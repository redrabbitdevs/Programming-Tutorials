// Bug 1: the "copy" is the same array
const original = [3, 1, 2];
const sortedCopy = original;
sortedCopy.sort();
console.log(original);

// Bug 2: a shared default object
const defaults = { tags: [] };
const post1 = { ...defaults };
const post2 = { ...defaults };
post1.tags.push("news");
console.log(post2.tags);

// Bug 3: fill with one object
const grid = new Array(2).fill([]);
grid[0].push("x");
console.log(grid);

// Bug 4: a function that changes its argument
function addTax(order) {
  order.total = order.total * 1.2;
  return order;
}
const order = { total: 100 };
addTax(order);
console.log(order.total);

// Bug 5: sort on a copy that is only one level deep
const rows = [{ n: 2 }, { n: 1 }];
const rowsCopy = [...rows];
rowsCopy[0].n = 99;
console.log(rows);
