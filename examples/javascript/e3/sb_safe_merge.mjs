const FORBIDDEN = new Set(["__proto__", "constructor", "prototype"]);

// Like merge, but refuses keys that reach a prototype, and builds
// objects without one.
function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (FORBIDDEN.has(key)) continue;
    const value = source[key];
    if (typeof value === "object" && value !== null) {
      target[key] ??= Object.create(null);
      safeMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const input = JSON.parse('{"theme": "dark", "__proto__": {"isAdmin": true}}');
const settings = safeMerge(Object.create(null), input);
console.log("settings:", settings);
console.log("visitor.isAdmin:", {}.isAdmin);
