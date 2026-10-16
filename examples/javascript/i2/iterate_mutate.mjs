const queue = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (const [name, value] of queue) {
  console.log("visit", name);
  if (name === "a") {
    queue.delete("b");
    queue.set("d", 4);
  }
}
console.log([...queue.keys()]);

const seen = new Set([1]);
for (const n of seen) {
  if (n < 4) {
    seen.add(n + 1);
  }
}
console.log([...seen]);
