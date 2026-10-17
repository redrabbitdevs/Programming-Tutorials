import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("hello from the server");
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}/`;

const response = await fetch(url);
console.log(response.status, response.ok, response.statusText);
console.log(response.headers.get("content-type"));
console.log(await response.text());

server.close();
server.closeAllConnections();
