const Color = Object.freeze({
  RED: Symbol("red"),
  GREEN: Symbol("green"),
});

function describe(color) {
  switch (color) {
    case Color.RED:
      return "stop";
    case Color.GREEN:
      return "go";
    default:
      return "unknown";
  }
}

console.log(describe(Color.RED), describe(Color.GREEN));
console.log(describe("red"), describe(Symbol("red")));
console.log(Color.RED.description, Color.RED.toString());
