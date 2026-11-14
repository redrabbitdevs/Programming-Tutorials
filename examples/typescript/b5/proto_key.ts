const counts: Record<string, number> = {};

console.log(typeof counts["constructor"]);
console.log(counts["constructor"] === undefined);

const safe = new Map<string, number>();
console.log(safe.get("constructor"));
