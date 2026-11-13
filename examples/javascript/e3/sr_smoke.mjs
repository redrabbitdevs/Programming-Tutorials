// Start the link shortener in the folder given as the argument, request
// each file it serves, and stop. Run it under --permission to check that a
// set of grants is enough for the app.
const dir = process.argv[2];
const { createApp } = await import(`../${dir}/server/app.mjs`);
const { createStore } = await import(`../${dir}/server/store.mjs`);

const server = createApp(createStore(), { write: console.log });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

for (const path of ["/", "/client.js", "/links.mjs"]) {
  const response = await fetch(base + path);
  console.log(response.status, path);
}
server.close();
