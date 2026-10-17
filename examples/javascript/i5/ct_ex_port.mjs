import { parseArgs } from "node:util";

function parseCli(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      port: { type: "string", short: "p", default: "3000" },
      open: { type: "boolean" },
    },
    allowPositionals: true,
  });
  const port = Number(values.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`invalid port: ${values.port}`);
  }
  return { port, open: values.open ?? false, files: positionals };
}

console.log(parseCli(["--open", "-p", "8080", "a.txt", "b.txt"]));
try {
  parseCli(["--port=abc"]);
} catch (error) {
  console.log(error.message);
}
