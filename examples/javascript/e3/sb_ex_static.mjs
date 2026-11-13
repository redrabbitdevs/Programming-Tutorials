import { resolve, sep } from "node:path";

const root = resolve("/srv/site/public");

// Map a request URL to a file under `root`, or null if it would escape,
// is malformed, or contains a NUL byte.
function fileFor(requestUrl) {
  let path;
  try {
    path = decodeURIComponent(new URL(requestUrl, "http://x").pathname);
  } catch {
    return null;
  }
  if (path.includes("\0")) return null;
  const full = resolve(root, "." + sep + path);
  if (full !== root && !full.startsWith(root + sep)) return null;
  return full === root ? resolve(root, "index.html") : full;
}

const requests = [
  "/",
  "/css/site.css",
  "/..%2f..%2fetc/passwd",
  "/%2e%2e/%2e%2e/etc/passwd",
  "/report.pdf%00.html",
  "/%E0%A4%A",
  "/..%2fpublic-backup/key.txt",
];
for (const url of requests) console.log(url.padEnd(28), fileFor(url));
