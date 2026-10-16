function findStart(grid) {
  for (const [y, row] of grid.entries()) {
    const x = row.indexOf("S");
    if (x !== -1) {
      return [x, y];
    }
  }
}

const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function shortestPath(grid) {
  const start = findStart(grid);
  const seen = new Set([start.join(",")]);
  const queue = [[...start, 0]];
  for (const [x, y, steps] of queue) {
    if (grid[y][x] === "E") {
      return steps;
    }
    for (const [dx, dy] of moves) {
      const [nx, ny] = [x + dx, y + dy];
      const cell = grid[ny]?.[nx];
      if (cell === undefined || cell === "#" || seen.has(`${nx},${ny}`)) {
        continue;
      }
      seen.add(`${nx},${ny}`);
      queue.push([nx, ny, steps + 1]);
    }
  }
  return -1;
}

console.log(shortestPath(["S.#", "..#", "#.E"]));
console.log(shortestPath(["S#E"]));
console.log(shortestPath(["SE"]));
