console.log("start");

async function runPlugin(pluginName, text) {
  try {
    const plugin = await import(`./plugins/${pluginName}.mjs`);
    return plugin.default(text);
  } catch (error) {
    if (error.code === "ERR_MODULE_NOT_FOUND") {
      return `no plugin called ${pluginName}`;
    }
    throw error;
  }
}

for (const name of ["shout", "whisper", "shout", "missing"]) {
  console.log(await runPlugin(name, "Hello"));
}
