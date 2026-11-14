type Light = "red" | "green" | "yellow";

function next(light: Light): Light {
  if (light === "red") return "green";
  if (light === "green") return "yellow";
  return "red";
}

let light: Light = "red";
for (let i = 0; i < 4; i++) {
  console.log(light);
  light = next(light);
}
