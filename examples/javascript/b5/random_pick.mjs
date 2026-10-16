function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(items) {
  return items[randomInt(0, items.length - 1)];
}

const die = randomInt(1, 6);
console.log(die >= 1 && die <= 6);

const colours = ["red", "green", "blue"];
console.log(colours.includes(pick(colours)));
