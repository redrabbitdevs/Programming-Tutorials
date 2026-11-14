function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

type Light = "red" | "yellow" | "green";

function next(light: Light): Light {
  switch (light) {
    case "red":
      return "green";
    case "green":
      return "yellow";
    default:
      return assertNever(light);
  }
}

console.log(next("red"));
