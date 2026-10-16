function* chunked(items, size) {
  for (let start = 0; start < items.length; start += size) {
    yield items.slice(start, start + size);
  }
}

console.log([...chunked([1, 2, 3, 4, 5], 2)]);
console.log([...chunked("abcdef", 3)]);
console.log([...chunked([], 4)]);

const pages = chunked([10, 20, 30], 2);
console.log(pages.next().value, pages.next().value, pages.next().done);
