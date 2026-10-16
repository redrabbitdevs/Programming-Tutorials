const target = { big: "pretend this is large" };
const ref = new WeakRef(target);

console.log(ref.deref() === target);

const current = ref.deref();
if (current !== undefined) {
  console.log(current.big);
}

const registry = new FinalizationRegistry((label) => {
  console.log("cleaned up", label);
});
const token = {};
registry.register(target, "target", token);
console.log(registry.unregister(token), registry.unregister(token));
