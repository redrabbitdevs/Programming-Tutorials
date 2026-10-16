const canSwim = (self) => ({
  swim: () => `${self.name} swims`,
});

const canFly = (self) => ({
  fly: () => `${self.name} flies`,
});

function createDuck(name) {
  const self = { name };
  return Object.assign(self, canSwim(self), canFly(self));
}

function createPenguin(name) {
  const self = { name };
  return Object.assign(self, canSwim(self));
}

const duck = createDuck("Duck");
const penguin = createPenguin("Pingu");
console.log(duck.swim(), duck.fly());
console.log(penguin.swim(), penguin.fly);
