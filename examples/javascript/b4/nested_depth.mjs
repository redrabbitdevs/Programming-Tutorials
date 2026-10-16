function depth(value) {
  if (!Array.isArray(value)) {
    return 0;
  }
  let deepest = 0;
  for (const item of value) {
    const d = depth(item);
    if (d > deepest) {
      deepest = d;
    }
  }
  return 1 + deepest;
}

console.log(depth(7));
console.log(depth([]));
console.log(depth([1, [2, [3]]]));
console.log(depth([[[[]]]]));
