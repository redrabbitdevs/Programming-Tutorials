import { startServer } from "./hf_helper.mjs";

const temps = { Oslo: 3, Cairo: 31 };
const { url, stop } = await startServer((req, res) => {
  const city = new URL(req.url, "http://localhost").searchParams.get("city");
  if (!(city in temps)) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ city, tempC: temps[city] }));
});

async function describeWeather(base, city) {
  const target = new URL("/weather", base);
  target.searchParams.set("city", city);
  const response = await fetch(target);
  if (response.status === 404) return `no data for ${city}`;
  const { tempC } = await response.json();
  return `${city}: ${tempC}C`;
}

for (const city of ["Oslo", "Cairo", "Paris"]) {
  console.log(await describeWeather(url, city));
}
await stop();
