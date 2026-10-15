const seen = new Set([3, 1, 3, 2, 1]);
console.log(seen, seen.size);

seen.add(4).add(1);
console.log(seen.has(4), seen.has(9));
seen.delete(3);
console.log([...seen]);

const unique = [...new Set(["a", "b", "a", "c", "b"])];
console.log(unique);

console.log(new Set([NaN, NaN, 0, -0]).size);
console.log(new Set([{ a: 1 }, { a: 1 }]).size);

seen.forEach((value) => console.log("item", value));
