const count = 0;
const label = "";
const missing = null;

console.log(count || 10, count ?? 10);
console.log(label || "none", label ?? "none");
console.log(missing || "fallback", missing ?? "fallback");
console.log(undefined ?? null ?? "last");
console.log(false || null, false ?? "kept");
console.log((null ?? 1) || 2);
