import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node ct_status.mjs; echo $?",
  "node ct_status.mjs code; echo $?",
  "node ct_status.mjs exit; echo $?",
  "node ct_status.mjs throw 2>/dev/null; echo $?",
  "node ct_status.mjs reject 2>/dev/null; echo $?",
]);
