function describe(this: { name: string }): string {
  return `I am ${this.name}`;
}

const user = { name: "Ada", describe };
console.log(user.describe());
console.log(describe.call({ name: "Grace" }));
