const arrow = async (x) => x + 1;

const tools = {
  async method() {
    return "from a method";
  },
};

class Greeter {
  async greet(name) {
    return `hello ${name}`;
  }
}

console.log(await arrow(1));
console.log(await tools.method());
console.log(await new Greeter().greet("Ada"));
console.log(await 5);
