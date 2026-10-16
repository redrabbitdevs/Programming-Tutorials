const a = { name: "a", next: [] };
const b = { name: "b", next: [] };
const c = { name: "c", next: [] };
a.next.push(b);
b.next.push(c);
c.next.push(a);

function walk(node, seen = new WeakSet()) {
  if (seen.has(node)) {
    return [];
  }
  seen.add(node);
  return [node.name, ...node.next.flatMap((n) => walk(n, seen))];
}

console.log(walk(a));
