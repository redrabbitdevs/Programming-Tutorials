const visited = new Map();
visited.set([0, 0], "origin");
console.log(visited.get([0, 0]));

const key = (x, y) => `${x},${y}`;
const grid = new Map();
grid.set(key(0, 0), "origin");
grid.set(key(2, 3), "tree");
console.log(grid.get(key(2, 3)), grid.get(key(9, 9)));

const nested = new Map();
nested.set(2, new Map([[3, "tree"]]));
console.log(nested.get(2)?.get(3));
