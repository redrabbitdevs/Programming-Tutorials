import { writeHeapSnapshot } from "node:v8";

class Result {
  constructor(id) {
    this.id = id;
    this.html = `<p>user ${id}</p>`.repeat(20);
  }
}

const LIMIT = 100;
const cache = new Map();

function render(id) {
  let result = cache.get(id);
  if (result) {
    cache.delete(id);
  } else {
    result = new Result(id);
  }
  cache.set(id, result);
  if (cache.size > LIMIT) cache.delete(cache.keys().next().value);
  return result;
}

for (let i = 0; i < 10_000; i++) render(i % 3 === 0 ? 1 : i);
console.log("cache size:", cache.size);
writeHeapSnapshot("cache.heapsnapshot");
