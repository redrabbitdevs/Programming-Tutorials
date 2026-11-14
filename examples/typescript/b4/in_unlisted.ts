function readName(value: object): string {
  if ("name" in value && typeof value.name === "string") {
    return value.name;
  }
  return "(no name)";
}

console.log(readName({ name: "Ada" }));
console.log(readName({ id: 1 }));
