function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const save = debounce((text) => console.log("saved:", text), 50);

save("h");
save("he");
save("hel");
console.log("typed three times");

setTimeout(() => {
  save("hello");
  console.log("typed once more");
}, 150);
