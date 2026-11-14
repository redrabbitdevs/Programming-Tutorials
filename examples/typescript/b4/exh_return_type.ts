type Light = "red" | "yellow" | "green";

function delay(light: Light): number {
  switch (light) {
    case "red":
      return 30;
    case "green":
      return 25;
  }
}

console.log(delay("red"));
