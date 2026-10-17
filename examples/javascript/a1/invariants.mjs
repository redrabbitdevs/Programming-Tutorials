const target = {};
Object.defineProperty(target, "id", { value: 1, writable: false });

const liar = new Proxy(target, {
  get: () => 99,
  has: () => false,
});

for (const attempt of [() => liar.id, () => "id" in liar]) {
  try {
    console.log(attempt());
  } catch (error) {
    console.log(error.name);
  }
}
console.log(new Proxy({ id: 1 }, { get: () => 99 }).id);
