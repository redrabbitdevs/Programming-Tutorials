const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);
const trim = (s) => s.trim();
const lower = (s) => s.toLowerCase();
const dashes = (s) => s.replace(/[^a-z0-9]+/g, "-");
const trimDashes = (s) => s.replace(/^-+|-+$/g, "");

let runs = 0;
const pipeline = pipe(trim, lower, dashes, trimDashes);
const cache = new Map();
function slugify(text) {
  if (!cache.has(text)) {
    runs += 1;
    cache.set(text, pipeline(text));
  }
  return cache.get(text);
}

const titles = [
  "  Hello, World!  ",
  "Tagged Templates & You",
  "  Hello, World!  ",
  "Proxy/Reflect 101",
];
console.log(titles.map(slugify));
console.log("runs:", runs);
