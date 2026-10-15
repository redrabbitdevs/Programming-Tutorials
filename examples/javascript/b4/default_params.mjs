function greet(name = "friend", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet());
console.log(greet("Ada"));
console.log(greet(undefined, "Hi"));
console.log(greet(null));
console.log(greet(""));

function rectangle(width, height = width) {
  return { width, height };
}
console.log(rectangle(4), rectangle(4, 2));

let calls = 0;
function nextId(id = ++calls) {
  return id;
}
console.log(nextId(), nextId(), nextId(99), nextId());
