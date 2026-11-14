interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): string;
}

type Cat = Animal & { purr(): string };

const rex: Dog = { name: "Rex", bark: () => "Woof" };
const tom: Cat = { name: "Tom", purr: () => "Purr" };

console.log(rex.name, rex.bark(), tom.name, tom.purr());
