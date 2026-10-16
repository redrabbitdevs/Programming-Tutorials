const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let found = null;

search: for (const row of grid) {
  for (const value of row) {
    if (value * value > 20) {
      found = value;
      break search;
    }
  }
}

console.log("first value whose square exceeds 20:", found);
