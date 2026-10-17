import { parseArgs } from "node:util";

const options = {
  help: { type: "boolean", short: "h" },
  name: { type: "string", default: "world" },
};

try {
  const { values } = parseArgs({ options });
  if (values.help) {
    console.log("usage: node ct_ex_help.mjs [--name NAME]");
  } else {
    console.log(`hello, ${values.name}`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
