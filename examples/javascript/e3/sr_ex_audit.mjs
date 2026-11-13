// Run with: node --permission-audit sr_ex_audit.mjs
// Lists every resource the hardened app touches while serving its pages.
import { channel } from "node:diagnostics_channel";
import { isAbsolute, relative } from "node:path";

const touched = new Set();
function record({ permission, resource }) {
  const where = isAbsolute(resource) ? relative("sr_lnk", resource)
    : resource || "(any)";
  touched.add(`${permission} ${where}`);
}
for (const scope of ["fs", "net", "child", "worker"]) {
  channel(`node:permission-model:${scope}`).subscribe(record);
}

// Import after subscribing, so the module loads are recorded too.
const { createApp } = await import("./sr_lnk/server/app.mjs");
const { createStore } = await import("./sr_lnk/server/store.mjs");
const server = createApp(createStore(), { write: () => {} });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
for (const path of ["/", "/client.js", "/links.mjs"]) await fetch(base + path);
server.close();

for (const entry of [...touched].sort()) console.log(entry);
