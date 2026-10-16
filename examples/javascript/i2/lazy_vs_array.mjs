const show = (label) => (n) => {
  console.log(label, n);
  return n;
};

console.log("array:");
[1, 2, 3].map(show("map")).filter(show("filter")).slice(0, 2);

console.log("iterator:");
[1, 2, 3]
  .values()
  .map(show("map"))
  .filter(show("filter"))
  .take(2)
  .toArray();
