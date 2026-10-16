function describe() {
  return this === undefined ? "no this" : this.label;
}

const box = { label: "box", describe };
const crate = { label: "crate" };

console.log(describe());
console.log(box.describe());
console.log(describe.call(crate));
console.log(box.describe.call(crate));
