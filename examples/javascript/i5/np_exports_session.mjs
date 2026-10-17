import { join } from "node:path";
import { session } from "./session.mjs";

session(join(import.meta.dirname, "np_demo"), ["node app.mjs"]);
