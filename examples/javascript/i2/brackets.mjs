function balanced(text) {
  const pairs = new Map([[")", "("], ["]", "["], ["}", "{"]]);
  const stack = [];
  for (const ch of text) {
    if ("([{".includes(ch)) {
      stack.push(ch);
    } else if (pairs.has(ch)) {
      if (stack.pop() !== pairs.get(ch)) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

for (const text of ["(a[b]{c})", "(]", "((", "", "a)"]) {
  console.log(JSON.stringify(text), balanced(text));
}
