import settings from "./settings.json" with { type: "json" };

for (const name of settings.names) {
  console.log(`${settings.greeting}, ${name}!`);
}
