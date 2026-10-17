import { execFileSync } from "node:child_process";

process.on("warning", (warning) => {
  console.log("warning:", warning.code);
});

const options = { shell: true, encoding: "utf8" };
const output = execFileSync("echo", ["two  spaces", "$HOME"], options);
const expanded = `two spaces ${process.env.HOME}`;
console.log("joined and expanded by the shell:", output.trim() === expanded);
