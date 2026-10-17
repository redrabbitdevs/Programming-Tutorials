const cache = new Map([["a", 1]]);

function lookup(key, callback) {
  if (cache.has(key)) {
    callback(cache.get(key));
  } else {
    setTimeout(() => callback(-1), 5);
  }
}

console.log("start");
lookup("a", (value) => console.log("a ->", value));
lookup("b", (value) => console.log("b ->", value));
console.log("end");
