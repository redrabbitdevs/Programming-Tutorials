const value = {
  a: undefined,
  b: () => 1,
  c: Symbol("s"),
  d: NaN,
  e: Infinity,
  f: new Date(Date.UTC(2024, 0, 15, 10, 30)),
  g: new Map([["k", 1]]),
  h: new Set([1, 2]),
  i: [undefined, () => 1],
  j: -0,
};
console.log(JSON.stringify(value));

try {
  JSON.stringify({ big: 10n });
} catch (error) {
  console.log(error.name);
}

const loop = {};
loop.self = loop;
try {
  JSON.stringify(loop);
} catch (error) {
  console.log(error.name);
}

const back = JSON.parse(JSON.stringify({ when: new Date(Date.UTC(2024, 0, 15)) }));
console.log(typeof back.when, back.when);
