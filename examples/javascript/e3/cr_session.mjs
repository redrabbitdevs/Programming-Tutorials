// Terminal session from "Cryptography and secrets". Expected transcript:
// Node 26.11.1.
import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node --env-file=cr_dev.env cr_config.mjs",
  "node cr_config.mjs",
]);
