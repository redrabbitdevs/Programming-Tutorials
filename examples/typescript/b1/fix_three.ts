const planet: string = "Mars";
const moons: number = 2;

function describe(name: string, count: number): string {
  return `${name} has ${count} moons`;
}

console.log(describe(planet, moons));
