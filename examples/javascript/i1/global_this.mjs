console.log(this);
console.log(typeof globalThis);
console.log(globalThis.setTimeout === setTimeout);

const hidden = 1;
console.log(globalThis.hidden);

globalThis.shared = 42;
console.log(shared);
