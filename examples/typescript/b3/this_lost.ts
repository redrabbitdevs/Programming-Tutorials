function describe(this: { name: string }): string {
  return `I am ${this.name}`;
}

const user = { name: "Ada", describe };
const lost = user.describe;

try {
  console.log(lost());
} catch (error) {
  console.log(String(error));
}
