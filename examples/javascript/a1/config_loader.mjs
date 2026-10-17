const defaults = { port: 3000, host: "localhost", debug: false };

function loadConfig(text) {
  const config = { ...defaults, ...JSON.parse(text) };
  const { port } = config;
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("port must be an integer from 1 to 65535");
  }
  return config;
}

const inputs = [
  '{ "port": 8080 }',
  '{ "debug": true, "port": "80" }',
  '{ "port": (process.exitCode = 3, 1) }',
];
for (const text of inputs) {
  try {
    console.log(loadConfig(text));
  } catch (error) {
    const message = error.name === "SyntaxError"
      ? error.message.split(" ")[0]
      : error.message;
    console.log(error.name, message);
  }
}
console.log("exit code:", process.exitCode);
