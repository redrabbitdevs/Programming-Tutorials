// Probes the advanced project's link shortener, unchanged, for the
// findings in the security review. Run from this folder: node sr_probe.mjs
import { createApp } from "../a4/lnk/server/app.mjs";
import { createStore } from "../a4/lnk/server/store.mjs";

const lines = [];
const server = createApp(createStore(), { write: (l) => lines.push(l) });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const shorten = async (url) => {
  const response = await fetch(`${base}/api/links`,
    { method: "POST", body: JSON.stringify({ url }) });
  return [response.status, await response.json()];
};

// 1. Which security headers does the page carry?
const page = await fetch(base);
for (const name of ["content-security-policy", "x-content-type-options"]) {
  console.log(`${name}:`, page.headers.get(name));
}

// 2. A link with a line break in it is accepted...
const withBreak = "https://example.com/a\r\nSet-Cookie: x=1";
const [status, link] = await shorten(withBreak);
console.log("line break accepted:", status);
// ...and every visit to it then fails.
const visit = await fetch(`${base}/${link.code}`, { redirect: "manual" });
console.log("visit:", visit.status);
console.log(lines.at(-2).split("\n")[0]);

// 3. A link that hides its real host behind a user name.
const [hidden] = await shorten("https://bank.example@phish.example/login");
console.log("user name in URL accepted:", hidden);

// 4. Codes that name Object.prototype members.
const proto = await fetch(`${base}/api/links/constructor`);
console.log("constructor code:", proto.status);
console.log("server timeouts:", server.requestTimeout, server.headersTimeout);
server.close();
