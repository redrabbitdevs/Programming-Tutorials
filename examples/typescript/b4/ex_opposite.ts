type Direction = "up" | "down" | "left" | "right";

function assertNever(value: never): never {
  throw new Error(`Unexpected: ${String(value)}`);
}

function opposite(direction: Direction): Direction {
  switch (direction) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
    default:
      return assertNever(direction);
  }
}

console.log(opposite("up"), opposite("left"));
