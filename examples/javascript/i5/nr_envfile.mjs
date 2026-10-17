import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const dir = await mkdtemp(join(tmpdir(), "envdemo-"));
const file = join(dir, ".env");
const text = 'GREETING=hello\nNAME="Ada L"\n# a comment\nPORT=8080\n';
await writeFile(file, text);

const show =
  "console.log(process.env.GREETING, process.env.NAME, process.env.PORT)";
const run = (env) =>
  execFileSync(process.execPath, [`--env-file=${file}`, "-e", show], {
    encoding: "utf8",
    env: { ...process.env, ...env },
  }).trim();

console.log(run({}));
console.log(run({ PORT: "9000" }));
await rm(dir, { recursive: true, force: true });
