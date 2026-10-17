import { createServer } from "node:http";

export async function startServer(handler) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const stop = () =>
    new Promise((resolve) => {
      server.close(resolve);
      server.closeAllConnections();
    });
  return { url, stop };
}
