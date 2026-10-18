// Validator helper, not shown in any lesson. It types commands into a shell
// the way a learner does and prints the transcript, so the terminal listings in
// the lessons are checked against real runs. Standard error is merged into
// standard output, as in a terminal, and the folder's own path is removed from
// the output, because every machine has a different one.
import { spawnSync } from "node:child_process";
import { dirname } from "node:path";

export function session(cwd, commands, extraEnv = {}) {
  const PATH = `${dirname(process.execPath)}:${process.env.PATH}`;
  let status = 0;
  for (const command of commands) {
    console.log(`$ ${command}`);
    if (command === "echo $?") {
      console.log(status);
      continue;
    }
    // npm picks emoji or plain labels from the locale; pin plain so CI matches.
    const env = { ...process.env, PATH, npm_config_unicode: "false", ...extraEnv };
    const run = spawnSync("sh", ["-c", `exec 2>&1; ${command}`], {
      cwd,
      env,
      encoding: "utf8",
    });
    status = run.status;
    const text = run.stdout.replaceAll(`file://${cwd}/`, "").replaceAll(`${cwd}/`, "");
    if (text !== "") process.stdout.write(text.endsWith("\n") ? text : text + "\n");
  }
}
