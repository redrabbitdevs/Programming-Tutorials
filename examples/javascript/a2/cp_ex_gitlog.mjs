import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const dir = await mkdtemp(join(tmpdir(), "gitlog-"));
const baseEnv = { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_NOSYSTEM: "1", GIT_COMMITTER_NAME: "CI",
  GIT_COMMITTER_EMAIL: "ci@example.com" };

function git(args, author = "Ada", date = "2026-01-01T12:00:00Z") {
  const env = { ...baseEnv, GIT_AUTHOR_NAME: author,
    GIT_AUTHOR_EMAIL: `${author.toLowerCase()}@example.com`,
    GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date };
  return run("git", args, { cwd: dir, env });
}

async function commit(file, message, author, date) {
  await writeFile(join(dir, file), `${message}\n`);
  await git(["add", file]);
  await git(["commit", "--quiet", "-m", message], author, date);
}

function parseLog(stdout) {
  return stdout.trim().split("\n").map((line) => {
    const [author, date, subject] = line.split("\t");
    return { author, date, subject };
  });
}

try {
  await git(["init", "--quiet"]);
  await commit("a.txt", "Add a", "Ada", "2026-01-02T10:00:00Z");
  await commit("b.txt", "Add b", "Grace", "2026-01-03T10:00:00Z");
  const format = "--format=%an%x09%ad%x09%s";
  const { stdout } = await git(["log", format, "--date=short"]);
  console.log(parseLog(stdout));
} catch (error) {
  console.log("git failed:", error.code);
} finally {
  await rm(dir, { recursive: true, force: true });
}
