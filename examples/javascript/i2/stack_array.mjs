const stack = [];
stack.push("a");
stack.push("b");
stack.push("c");

console.log(stack.at(-1), stack.length);
console.log(stack.pop(), stack.pop(), stack);

function reverse(text) {
  const letters = [...text];
  let result = "";
  while (letters.length > 0) {
    result += letters.pop();
  }
  return result;
}
console.log(reverse("stack"));
