function* chain(iterables) {
  for (const iterable of iterables) yield* iterable;
}

export function concat(...iterables) {
  if (typeof Iterator.concat === "function") {
    return Iterator.concat(...iterables);
  }
  for (const iterable of iterables) {
    if (typeof iterable !== "object" || iterable === null) {
      throw new TypeError("Iterator.concat expects iterable objects");
    }
  }
  return chain(iterables);
}

console.log([...concat([1, 2], new Set([3]), ["a", "b"])]);
try {
  concat("ab");
} catch (error) {
  console.log(error.name);
}
