const graph = new Map();

function addEdge(a, b) {
  for (const [from, to] of [[a, b], [b, a]]) {
    if (!graph.has(from)) {
      graph.set(from, new Set());
    }
    graph.get(from).add(to);
  }
}

addEdge("home", "shop");
addEdge("home", "park");
addEdge("shop", "mall");
addEdge("park", "mall");
addEdge("mall", "cinema");
console.log(graph.get("home"), graph.size);

function distances(start) {
  const dist = new Map([[start, 0]]);
  const queue = [start];
  for (let i = 0; i < queue.length; i++) {
    const place = queue[i];
    for (const next of graph.get(place)) {
      if (!dist.has(next)) {
        dist.set(next, dist.get(place) + 1);
        queue.push(next);
      }
    }
  }
  return dist;
}

console.log(distances("home"));
