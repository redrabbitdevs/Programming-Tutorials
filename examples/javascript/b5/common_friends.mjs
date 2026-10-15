const friends = {
  ada: ["grace", "linus", "alan"],
  bob: ["alan", "dennis", "grace"],
  cy: ["grace", "alan", "ken"],
};

const sets = Object.values(friends).map((list) => new Set(list));
const common = sets.reduce((acc, set) => acc.intersection(set));
console.log([...common].sort());

const everyone = sets.reduce((acc, set) => acc.union(set));
console.log([...everyone].sort());
