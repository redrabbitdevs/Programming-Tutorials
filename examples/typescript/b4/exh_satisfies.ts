type Light = "red" | "yellow" | "green";

function delay(light: Light): number {
  switch (light) {
    case "red":
      return 30;
    case "yellow":
      return 3;
    case "green":
      return 25;
    default:
      light satisfies never;
      throw new Error("unreachable");
  }
}

console.log(delay("red"), delay("yellow"), delay("green"));
