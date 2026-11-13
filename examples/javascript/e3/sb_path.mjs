import { join, resolve, sep } from "node:path";

const root = resolve("/srv/site/public");

const naive = (urlPath) => join(root, urlPath);

// Resolve the path, then check it is still inside the root.
function inside(urlPath) {
  const full = resolve(root, "." + sep + urlPath);
  return full === root || full.startsWith(root + sep) ? full : null;
}

for (const p of ["/index.html", "/../../../etc/passwd", "/css/../app.js"]) {
  console.log(p);
  console.log("  join:  ", naive(p));
  console.log("  inside:", inside(p));
}
