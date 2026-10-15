function countCodePoints(text) {
  return [...text].length;
}

const message = "Hi 😀😀";
console.log(message.length);
console.log(countCodePoints(message));
