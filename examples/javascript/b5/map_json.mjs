const stock = new Map([
  ["a", 1],
  ["b", 2],
]);

const text = JSON.stringify([...stock]);
console.log(text);

const back = new Map(JSON.parse(text));
console.log(back);
console.log(back.get("b"));
