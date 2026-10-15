const colours = ["red", "green", "blue"];
for (const colour of colours) {
  console.log(colour);
}

for (const char of "héllo") {
  console.log(char);
}

for (const [index, colour] of colours.entries()) {
  console.log(index, colour);
}

const stock = new Map([["apples", 4], ["pears", 0]]);
for (const [item, count] of stock) {
  console.log(item, count);
}

const plain = { a: 1 };
try {
  for (const x of plain) {
    console.log(x);
  }
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
