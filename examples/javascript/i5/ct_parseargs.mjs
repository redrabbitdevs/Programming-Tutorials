import { parseArgs } from "node:util";

const options = {
  verbose: { type: "boolean", short: "v" },
  max: { type: "string", short: "m", default: "10" },
  tag: { type: "string", multiple: true },
};
const argv = ["-v", "--max=5", "build", "--tag", "a", "--tag", "b", "src"];
const { values, positionals } = parseArgs({
  args: argv,
  options,
  allowPositionals: true,
});

console.log(values.verbose, values.max, values.tag);
console.log(positionals);

for (const args of [["--nope"], ["--max"], ["extra"]]) {
  try {
    parseArgs({ args, options });
  } catch (error) {
    console.log(error.code, "|", error.message);
  }
}
