function makeT(dictionary) {
  return (strings, ...values) => {
    const key = strings.join("{}");
    const pieces = (dictionary[key] ?? key).split("{}");
    let out = pieces[0];
    values.forEach((value, i) => {
      out += value + pieces[i + 1];
    });
    return out;
  };
}

const t = makeT({
  "Hello, {}!": "Hallo, {}!",
  "{} new messages": "{} neue Nachrichten",
});

console.log(t`Hello, ${"Ada"}!`);
console.log(t`${3} new messages`);
console.log(t`Goodbye, ${"Ada"}`);
