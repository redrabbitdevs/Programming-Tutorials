// Bug: every handler reports the same index.
const buggy = [];
for (var i = 0; i < 3; i++) {
  buggy.push(() => `handler ${i}`);
}
console.log(buggy.map((h) => h()));

// Fix 1: let gives each pass its own variable.
const fixed1 = [];
for (let i = 0; i < 3; i++) {
  fixed1.push(() => `handler ${i}`);
}
console.log(fixed1.map((h) => h()));

// Fix 2: a factory function captures the value as a parameter.
function makeHandler(index) {
  return () => `handler ${index}`;
}
const fixed2 = [];
for (var j = 0; j < 3; j++) {
  fixed2.push(makeHandler(j));
}
console.log(fixed2.map((h) => h()));
