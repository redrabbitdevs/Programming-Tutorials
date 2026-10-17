function lint(source) {
  const problems = [];
  source.split("\n").forEach((line, index) => {
    const number = index + 1;
    if (line.trimStart().startsWith("var ")) problems.push(`${number}: no-var`);
    if (line.includes(" == ") || line.includes(" != ")) {
      problems.push(`${number}: eqeqeq`);
    }
  });
  return problems;
}

const source = `var a = 1;
if (a == "1") { }
if (a === 1) { }
let b = a != 2;`;
console.log(lint(source).join("\n"));
