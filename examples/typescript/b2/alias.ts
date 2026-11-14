type Light = "red" | "green" | "yellow";

function next(light: Light): Light {
  switch (light) {
    case "red":
      return "green";
    case "green":
      return "yellow";
    case "yellow":
      return "red";
  }
}

console.log(next("red"), next("yellow"));
