import { readFileSync } from "node:fs";

// Things a policy of script-src 'self' without 'unsafe-inline' blocks.
const RULES = [
  [/<script(?![^>]*\bsrc=)[^>]*>/gi, "inline <script>"],
  [/\son[a-z]+\s*=/gi, "event handler attribute"],
  [/<style[\s>]/gi, "inline <style> (needs style-src)"],
  [/\sstyle\s*=/gi, "style attribute (needs style-src)"],
  [/href\s*=\s*["']?javascript:/gi, "javascript: URL"],
];

function inlineCode(html) {
  const found = [];
  for (const [pattern, label] of RULES) {
    const count = html.match(pattern)?.length ?? 0;
    if (count > 0) found.push(`${count} x ${label}`);
  }
  return found;
}

const legacy = `<button onclick="save()">Save</button>
<script>window.config = { debug: true };</script>
<p style="color: red">Error</p>
<a href="javascript:void(0)" onmouseover="tip()">?</a>
<script type="module" src="/app.js"></script>`;

console.log("legacy page:", inlineCode(legacy));
const page = readFileSync("sr_lnk/public/index.html", "utf8");
console.log("sr_lnk page:", inlineCode(page));
