// Runs with your user's rights during `npm install`. This one only writes a
// file into the project that installed it; a malicious one could do anything.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const project = process.env.INIT_CWD ?? process.cwd();
writeFileSync(join(project, "postinstall-ran.txt"), "greet postinstall ran\n");
