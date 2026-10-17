import { startServer } from "./hf_helper.mjs";

const { url, stop } = await startServer(async (req, res) => {
  req.setEncoding("utf8");
  let text = "";
  for await (const chunk of req) text += chunk;
  const { a, b } = JSON.parse(text);
  const valid = typeof a === "number" && typeof b === "number";
  res.writeHead(valid ? 200 : 400, { "content-type": "application/json" });
  const answer = valid ? { sum: a + b } : { error: "numbers required" };
  res.end(JSON.stringify(answer));
});

for (const body of [{ a: 2, b: 3 }, { a: "2", b: 3 }]) {
  const response = await fetch(`${url}/sum`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(response.status, await response.json());
}
await stop();
