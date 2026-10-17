import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node ct_ex_help.mjs",
  "node ct_ex_help.mjs --name Ada",
  "node ct_ex_help.mjs -h",
  "node ct_ex_help.mjs --colour; echo $?",
]);
