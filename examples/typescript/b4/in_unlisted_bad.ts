function readName(value: object): unknown {
  return value.name;
}

console.log(readName({ name: "Ada" }));
