function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}
repeat(3, (i) => console.log("run", i));

function processAll(items, onItem, onDone) {
  for (const item of items) {
    onItem(item);
  }
  onDone(items.length);
}
processAll(
  ["a", "b"],
  (item) => console.log("item", item),
  (count) => console.log("done,", count, "items"),
);

const words = ["pear", "fig", "banana"];
words.forEach((word, index) => console.log(index, word));
