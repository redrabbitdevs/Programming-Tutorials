// Grade the security headers of the advanced project and the reviewed one.
const REQUIRED = {
  "content-security-policy": (v) => /default-src 'self'/.test(v) &&
    /frame-ancestors 'none'/.test(v),
  "x-content-type-options": (v) => v === "nosniff",
  "referrer-policy": (v) => v === "no-referrer" || v === "same-origin",
};

async function grade(appDir) {
  const { createApp } = await import(`./${appDir}/server/app.mjs`);
  const { createStore } = await import(`./${appDir}/server/store.mjs`);
  const server = createApp(createStore(), { write: () => {} });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const missing = new Set();
  for (const path of ["/", "/client.js", "/api/links/nope"]) {
    const { headers } = await fetch(base + path);
    for (const [name, ok] of Object.entries(REQUIRED)) {
      if (!ok(headers.get(name) ?? "")) missing.add(name);
    }
  }
  server.close();
  return [...missing];
}

console.log("../a4/lnk missing:", await grade("../a4/lnk"));
console.log("sr_lnk missing:", await grade("sr_lnk"));
