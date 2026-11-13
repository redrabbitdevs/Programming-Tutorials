// Terminal sessions from "Project: security review". Expected transcript:
// Node 26.11.1. The commands run in examples/javascript, so that both the
// advanced project (a4/lnk) and the reviewed copy (e3/sr_lnk) are in reach.
import { join } from "node:path";
import { session } from "./session.mjs";

const net = "--allow-net";
session(join(import.meta.dirname, ".."), [
  `node --permission --allow-fs-read=e3/sr_lnk ${net} e3/sr_smoke.mjs e3/sr_lnk`,
  "node --permission --allow-fs-read=a4/lnk/server --allow-fs-read=a4/lnk/shared" +
    ` ${net} e3/sr_smoke.mjs a4/lnk`,
  "node --permission --allow-fs-read=e3/sr_lnk/server" +
    ` --allow-fs-read=e3/sr_lnk/shared ${net} e3/sr_smoke.mjs e3/sr_lnk`,
]);
session(import.meta.dirname, [
  "node --permission-audit sr_ex_audit.mjs",
]);
