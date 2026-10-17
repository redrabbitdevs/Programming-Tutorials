function highlight(text, term) {
  if (term === "") {
    return text;
  }
  const re = new RegExp(RegExp.escape(term), "gi");
  return text.replace(re, "<mark>$&</mark>");
}

console.log(highlight("Cost: 5.00 or 5x00? C++ rocks, c++ too", "5.00"));
console.log(highlight("Cost: 5.00 or 5x00? C++ rocks, c++ too", "c++"));
