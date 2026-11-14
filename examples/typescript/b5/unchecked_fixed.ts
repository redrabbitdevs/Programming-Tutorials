const scores: Record<string, number> = { ada: 90 };

const bob = scores.bob;
console.log(bob === undefined ? "no score" : bob.toFixed(1));
console.log((scores.ada ?? 0).toFixed(1));
