const settings = Object.freeze({
  theme: "dark",
  window: { width: 800 },
});

try {
  settings.theme = "light";
} catch (error) {
  console.log(error.name);
}
console.log(settings.theme);

settings.window.width = 1024;
console.log(settings.window.width);
console.log(Object.isFrozen(settings), Object.isFrozen(settings.window));

const items = Object.freeze([1, 2, 3]);
try {
  items.push(4);
} catch (error) {
  console.log(error.name);
}
