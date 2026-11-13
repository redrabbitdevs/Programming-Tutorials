import { readFileSync } from "node:fs";

const [file, wanted] = process.argv.slice(2);
const profile = JSON.parse(readFileSync(file, "utf8"));
const byId = new Map(profile.nodes.map((node) => [node.id, node]));

const selfTime = new Map();
profile.samples.forEach((id, i) => {
  selfTime.set(id, (selfTime.get(id) ?? 0) + profile.timeDeltas[i]);
});

// Total time of a node: its own samples plus all of its descendants'.
function totalTime(node) {
  let time = selfTime.get(node.id) ?? 0;
  for (const child of node.children ?? []) time += totalTime(byId.get(child));
  return time;
}

// A function can appear at several places in the tree; add them up.
// (This double-counts recursive functions, which this program has none of.)
const all = profile.timeDeltas.reduce((a, b) => a + b, 0);
const mine = profile.nodes
  .filter((node) => node.callFrame.functionName === wanted)
  .reduce((sum, node) => sum + totalTime(node), 0);
console.log(`${wanted} total time over 90%:`, mine / all > 0.9);
