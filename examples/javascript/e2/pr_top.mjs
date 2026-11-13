import { readFileSync } from "node:fs";
import { basename } from "node:path";

const profile = JSON.parse(readFileSync(process.argv[2], "utf8"));
const byId = new Map(profile.nodes.map((node) => [node.id, node]));

function label({ callFrame: { functionName, url, lineNumber } }) {
  const name = functionName || "(anonymous)";
  return url ? `${name} ${basename(url)}:${lineNumber + 1}` : name;
}

// Each sample names the node that was running; timeDeltas[i] is the
// time in microseconds since the previous sample.
const self = new Map();
profile.samples.forEach((id, i) => {
  const key = label(byId.get(id));
  self.set(key, (self.get(key) ?? 0) + profile.timeDeltas[i]);
});

const total = [...self.values()].reduce((a, b) => a + b, 0);
const hot = [...self].filter(([, us]) => us / total > 0.1);
hot.sort((a, b) => b[1] - a[1]);
for (const [key] of hot) console.log("over 10% self time:", key);
