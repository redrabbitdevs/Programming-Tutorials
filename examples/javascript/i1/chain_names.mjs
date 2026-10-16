function chain(value) {
  const names = [];
  let proto = Object.getPrototypeOf(value);
  while (proto !== null) {
    names.push(proto.constructor.name);
    proto = Object.getPrototypeOf(proto);
  }
  return names;
}

console.log(chain([]));
console.log(chain(new Map()));
console.log(chain(() => {}));
console.log(chain(5));
console.log(chain(Object.create(null)));
