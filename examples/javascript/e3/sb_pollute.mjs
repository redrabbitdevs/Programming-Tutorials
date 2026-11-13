// Copy every key of `source` into `target`, recursing into objects.
function merge(target, source) {
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (typeof value === "object" && value !== null) {
      target[key] ??= {};
      merge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const body = '{"theme": "dark", "__proto__": {"isAdmin": true}}';
const input = JSON.parse(body);
console.log("own __proto__ key:", Object.hasOwn(input, "__proto__"));

const settings = merge({}, input);
const visitor = {};
console.log("settings.theme:", settings.theme);
console.log("visitor.isAdmin:", visitor.isAdmin);
