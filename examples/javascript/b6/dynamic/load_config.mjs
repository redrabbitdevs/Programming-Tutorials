import config from "./config.json" with { type: "json" };

console.log(config.appName, config.port);
console.log(config.features.includes("export"));

config.port = 9090;
const again = await import("./config.json", { with: { type: "json" } });
console.log(again.default.port, again.default === config);

try {
  await import("./config.json");
} catch (error) {
  console.log(error.code);
}
