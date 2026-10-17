import { startServer } from "./hf_helper.mjs";

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.json();
}

const live = await startServer((req, res) => {
  res.writeHead(500);
  res.end("oops");
});
try {
  await getJson(`${live.url}/data`);
} catch (error) {
  console.log(error.message);
}
await live.stop();

const dead = await startServer(() => {});
await dead.stop();
try {
  await fetch(dead.url);
} catch (error) {
  console.log(error.name, error.message);
  console.log(error.cause.code);
}
