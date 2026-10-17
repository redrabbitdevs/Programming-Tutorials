import { join } from "node:path";
import { session } from "./session.mjs";

session(join(import.meta.dirname, "np_scripts"), [
  "node --run hello",
  "node --run show -- one two",
]);
