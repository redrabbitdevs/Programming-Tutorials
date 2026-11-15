type Color = "red" | "green";

function paint(color: Color): string {
  return `painting ${color}`;
}

console.log(paint("green"));
