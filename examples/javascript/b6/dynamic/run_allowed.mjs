const allowed = ["shout", "whisper", "reverse"];

async function runPlugin(pluginName, text) {
  if (!allowed.includes(pluginName)) {
    return `"${pluginName}" is not an allowed plugin`;
  }
  const plugin = await import(`./plugins/${pluginName}.mjs`);
  return plugin.default(text);
}

for (const name of ["reverse", "../config", "reverse"]) {
  console.log(await runPlugin(name, "Hello"));
}
