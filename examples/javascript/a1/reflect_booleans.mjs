const frozen = Object.freeze({ id: 1 });

console.log(Reflect.set(frozen, "id", 2), frozen.id);
console.log(Reflect.defineProperty(frozen, "extra", { value: 1 }));

try {
  Object.defineProperty(frozen, "extra", { value: 1 });
} catch (error) {
  console.log(error.name);
}
console.log(Reflect.ownKeys({ a: 1, [Symbol("s")]: 2 }));
