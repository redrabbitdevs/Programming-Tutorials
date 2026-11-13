import { bench } from "./mp_bench.mjs";

const input = Array.from({ length: 5000 }, (_, i) => (i * 37) % 2500);

function withIncludes(values) {
  const out = [];
  for (const v of values) if (!out.includes(v)) out.push(v);
  return out;
}

const withIndexOf = (values) =>
  values.filter((v, i) => values.indexOf(v) === i);

const withSet = (values) => [...new Set(values)];

const answers = [withIncludes, withIndexOf, withSet]
  .map((f) => f(input).join());
console.log("all agree:", answers.every((a) => a === answers[0]));

const options = { batch: 1, samples: 20, warmup: 3 };
const results = Object.entries({ withIncludes, withIndexOf, withSet })
  .map(([name, f]) => [name, bench(() => f(input), options)]);
results.sort((a, b) => a[1].median - b[1].median);
console.log("fastest:", results[0][0]);
