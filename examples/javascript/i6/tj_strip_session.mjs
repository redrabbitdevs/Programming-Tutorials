import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node tj_main.ts",
  "node tj_enum.ts 2>&1 | grep Error",
  "node tj_badimport.ts 2>&1 | grep Error",
  "node tj_wrongtype.ts",
]);
