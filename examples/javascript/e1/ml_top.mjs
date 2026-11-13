import { readFileSync } from "node:fs";

const profile = JSON.parse(readFileSync(process.argv[2], "utf8"));
const sites = new Map();

// Keep your own frames (file: URLs) and the function that allocated.
function walk(node, path) {
  const { functionName, url } = node.callFrame;
  const name = functionName || "(top level)";
  const mine = url.startsWith("file:") ? [...path, name] : path;
  if (node.selfSize > 0) {
    const key = [...path, name].join(" > ");
    sites.set(key, (sites.get(key) ?? 0) + node.selfSize);
  }
  for (const child of node.children) walk(child, mine);
}
walk(profile.head, []);

const total = [...sites.values()].reduce((a, b) => a + b, 0);
for (const [site, size] of sites) {
  if (size / total > 0.2) console.log(site);
}
